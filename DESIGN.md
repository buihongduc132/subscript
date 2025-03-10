### Entities
View ERD.mmd
using mermaid JS using one of the below approaches:
  - [Live view](https://mermaid.live)
  - Visual [code extension](https://marketplace.visualstudio.com/items?itemName=MermaidChart.vscode-mermaid-chart)
  - Other methods please refer to official document [here](mermaid.js.org)


### APIs design

**_INTERNAL_**
- GET /health

**Users**

- GET /v1/me
- POST /v1/me
- POST /auth/login
- POST /auth/logout
- POST /auth/register
- POST /auth/confirmation?token=<tokenFromEmail>

GDPR use cases
- GET /v1/me/gdpr: List self information related to GDPR compliance
- DELETE /v1/me/gdpr:
  - Delete by type of data
  - Delete by time range
  - Delete ALL

**Organization**
  
  Normal User
  - GET /v1/org
  - GET /v1/org/:orgId


  Org ADMIN actions:
  - POST /v1/org/:orgId
  - PUT /v1/org/:orgId
  - PATCH /v1/org/:orgId
  - DELETE /v1/org/:orgId

  - GET /v1/org/:orgId/users
  - POST /v1/org/:orgId/users/:userId
  - PUT /v1/org/:orgId/users/:userId
  - PATCH /v1/org/:orgId/users/:userId
  - DELETE /v1/org/:orgId/users/:userId
  - DELETE /v1/org/:orgId/users/:userId/gdpr

  **Project**
  
  CRUD (Normal user)
  - GET /v1/projects
  - GET /v1/projects/:projectId
    - can have `publishToken`
  - POST /v1/projects/:projectId
    - can have `publishToken`
  - PUT /v1/projects/:projectId
    - can have `publishToken`
  - PATCH /v1/projects/:projectId
    - can have `publishToken`
  - DELETE /v1/projects/:projectId
    - can have `publishToken`
  
  ADMIN endpoints
  (Project ADMIN | Org User that own Project)
  - GET /v1/projects/:projectId/users 
  - POST /v1/projects/:projectId/users/:userId
  - PUT /v1/projects/:projectId/users/:userId
  - PATCH /v1/projects/:projectId/users/:userId
  - DELETE /v1/projects/:projectId/users/:userId
  - DELETE /v1/projects/:projectId/users/:userId/gdpr

  **Project Stages**

  CRUD
  - GET /v1/projects/:projectId/stages
  - GET /v1/projects/:projectId/stages/:stageId
  - POST /v1/projects/:projectId/stages/:stageId
  - PUT /v1/projects/:projectId/stages/:stageId
  - PATCH /v1/projects/:projectId/stages/:stageId
  - DELETE /v1/projects/:projectId/stages/:stageId

  - GET /v1/projects/:projectId/stages/:stageId/tickets

  **Tickets**
  
  CRUD
  - GET /v1/projects/:projectId/tickets
  - GET /v1/projects/:projectId/tickets/:ticketId
  - POST /v1/projects/:projectId/tickets/:ticketId
  - PUT /v1/projects/:projectId/tickets/:ticketId
  - PATCH /v1/projects/:projectId/tickets/:ticketId
  - DELETE /v1/projects/:projectId/tickets/:ticketId
  
  Bulk Actions
  - POST /v1/projects/:projectId/tickets (import)
  - PUT /v1/projects/:projectId/tickets (bulkActions)
  - PATCH /v1/projects/:projectId/tickets (bulkActions)
  - DELETE /v1/projects/:projectId/tickets (bulkActions)

  - GET /v1/projects/:projectId/tickets/:ticketId/histories
  
  **Ticket Comments**
  - GET /v1/projects/:projectId/tickets/:ticketId/comments
  - GET /v1/comments/:commentId
  - POST /v1/comments/:commentId
  - PUT /v1/comments/:commentId
  - PATCH /v1/comments/:commentId
  - DELETE /v1/comments/:commentId
