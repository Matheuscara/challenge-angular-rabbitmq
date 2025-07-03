import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { io, Socket } from "socket.io-client";
import { v4 as uuid } from "uuid";
import { firstValueFrom } from "rxjs";

export interface StatusEvent {
  mensagemId: string;
  status: "PROCESSADO_SUCESSO" | "FALHA_PROCESSAMENTO";
}

@Injectable({ providedIn: "root" })
export class NotificationService {
  private apiUrl = "http://localhost:3000/api/notificar";
  private socket!: Socket;

  private _history = signal<StatusEvent[]>([]);
  readonly history = this._history.asReadonly();

  constructor(private http: HttpClient) {
    this.connectWebSocket();
  }

  async sendNotification(conteudo: string): Promise<{ mensagemId: string }> {
    const mensagemId = uuid();
    await firstValueFrom(
      this.http.post<{ mensagemId: string }>(this.apiUrl, {
        mensagemId,
        conteudoMensagem: conteudo,
      }),
    );

    return { mensagemId };
  }

  private connectWebSocket() {
    this.socket = io("http://localhost:3000");
    this.socket.on("notificationStatus", (evt) => {
      console.log("🔔 Evento recebido via WS:", evt);
      this._history.update((list) => [...list, evt]);
    });
  }
}
