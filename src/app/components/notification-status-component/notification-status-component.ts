import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NotificationService, StatusEvent } from "../../services/notification.service";

interface SentNotification {
  mensagemId: string;
  conteudo: string;
  status: string;
}

@Component({
  selector: "app-notification-status",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./notification-status-component.html",
  styleUrls: ["./notification-status-component.scss"],
})
export class NotificationStatusComponent {
  private readonly service = inject(NotificationService);

  text = signal("");

  sentList = signal<SentNotification[]>([]);

  events = this.service.history;

  lastStatus = computed(() => {
    const map = new Map<string, string>();
    for (const evt of this.events()) {
      map.set(evt.mensagemId, evt.status);
    }
    return map;
  });

  async enviar() {
    const conteudo = this.text().trim();
    if (!conteudo) return;

    const mensagemId = (await this.service.sendNotification(conteudo)).mensagemId;

    this.sentList.update((list) => [
      ...list,
      { mensagemId, conteudo, status: "AGUARDANDO_PROCESSAMENTO" },
    ]);
    this.text.set("");
  }
}
