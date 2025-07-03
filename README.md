# ChallengeAngularRabbitmq

Este projeto demonstra um desafio de front-end em Angular que consome um back-end via RabbitMQ e WebSocket para exibir atualizações em tempo real.

## Sobre

Ao enviar uma notificação pelo formulário, o Angular:

1. Gera um `mensagemId` (UUID)
2. Publica no endpoint REST (`POST /api/notificar`)
3. Recebe em tempo real, via WebSocket, eventos de status (`notificationStatus`) do back-end
4. Atualiza a interface imediatamente com o histórico completo de status

## Tecnologias

- Angular 20
- Socket.IO Client
- RxJS / Signals
- UUID
- NgModel (FormsModule)

## Como executar

```bash
# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
ng serve
```

Abra no navegador em `http://localhost:4200/`.

## Principais comandos

- **Gerar componente**

  ```bash
  ng generate component components/nome-do-componente
  ```

- **Build de produção**

  ```bash
  ng build --configuration production
  ```

- **Testes unitários**

  ```bash
  ng test
  ```

- **Testes end-to-end**
  Se configurado,

  ```bash
  ng e2e
  ```

## Estrutura

```
src/
 ├─ app/
 │   ├─ components/notification-status-component  # Form + lista + log WS
 │   └─ services/notification.service.ts         # HTTP + WebSocket + Signals
 └─ index.html                                   # <app-root>
```

## Contribuição

1. Faça um fork do repositório
2. Crie uma branch (`git checkout -b feature/x`)
3. Faça suas alterações e commits
4. Envie um pull request

---

Desafio concluído: comunicação reativa em tempo real entre Angular e back-end usando WebSocket.
