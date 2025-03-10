### Entities

  > users

  > org
    > project
      > PublishInfo
      > ticketStages
        > ticket
          > ticketHistory
            - <Who Did What at When>
          > Comments
            > Attachments

### APIs design

**_INTERNAL_**
/health

**Users**
GET /v1/me
POST /v1/me

POST /login
POST /logout

GDPR use cases
GET /v1/me/gdpr: List self information related to GDPR compliance
DELETE /v1/me/gdpr:
  - Delete by type of data
  - Delete by time range
  - Delete ALL

**Organization**
  GET /v1/org
  GET /v1/org/:orgId
  POST /v1/org/:orgId (Org ADMIN)
  PUT /v1/org/:orgId (Org ADMIN)
  PATCH /v1/org/:orgId (Org ADMIN)
  DELETE /v1/org/:orgId (Org ADMIN)

  GET /v1/org/:orgId/users (Org ADMIN)
  POST /v1/org/:orgId/users/:userId (Org ADMIN)
  PUT /v1/org/:orgId/users/:userId (Org ADMIN)
  PATCH /v1/org/:orgId/users/:userId (Org ADMIN)
  DELETE /v1/org/:orgId/users/:userId (Org ADMIN)
  DELETE /v1/org/:orgId/users/:userId/gdpr (Org ADMIN)

  **Project**
  GET /v1/projects
  GET /v1/projects/:projectId
    - can have publishToken
  POST /v1/projects/:projectId
    - can have publishToken
  PUT /v1/projects/:projectId
    - can have publishToken
  PATCH /v1/projects/:projectId
    - can have publishToken
  DELETE /v1/projects/:projectId
    - can have publishToken
  
  GET /v1/projects/:projectId/users (Project ADMIN | Org User that own Project)
  POST /v1/projects/:projectId/users/:userId (Project ADMIN | Org User that own Project)
  PUT /v1/projects/:projectId/users/:userId (Project ADMIN | Org User that own Project)
  PATCH /v1/projects/:projectId/users/:userId (Project ADMIN | Org User that own Project)
  DELETE /v1/projects/:projectId/users/:userId (Project ADMIN | Org User that own Project)
  DELETE /v1/projects/:projectId/users/:userId/gdpr (Project ADMIN | Org User that own Project)

  **Project Stages**
    GET /v1/projects/:projectId/stages
    GET /v1/projects/:projectId/stages/:stageId
    POST /v1/projects/:projectId/stages/:stageId
    PUT /v1/projects/:projectId/stages/:stageId
    PATCH /v1/projects/:projectId/stages/:stageId
    DELETE /v1/projects/:projectId/stages/:stageId

    GET /v1/projects/:projectId/stages/:stageId/tickets

  **Tickets**
    GET /v1/projects/:projectId/tickets
    GET /v1/projects/:projectId/tickets/:ticketId
    POST /v1/projects/:projectId/tickets/:ticketId
    PUT /v1/projects/:projectId/tickets/:ticketId
    PATCH /v1/projects/:projectId/tickets/:ticketId
    DELETE /v1/projects/:projectId/tickets/:ticketId
    
    POST /v1/projects/:projectId/tickets (import)
    PUT /v1/projects/:projectId/tickets (bulkActions)
    PATCH /v1/projects/:projectId/tickets (bulkActions)
    DELETE /v1/projects/:projectId/tickets (bulkActions)

    GET /v1/projects/:projectId/tickets/:ticketId/histories
  
  **Ticket Comments**
    GET /v1/projects/:projectId/tickets/:ticketId/comments
    GET /v1/comments/:commentId
    POST /v1/comments/:commentId
    PUT /v1/comments/:commentId
    PATCH /v1/comments/:commentId
    DELETE /v1/comments/:commentId
