# Ticket Tracker

This is a full stack Angular and Node.js demo app

DEMO: https://ticket-tracker.xyz/tickets

Important note: If 'Create demo tickets/notes' checkbox is selected, after successfully signing up you may have to wait minute and then refresh the page as the tickets are created asynchronously
(A fake email can be used there is no email verification)

## Features

- Angular client for view/creating/updating tickets
- Custom ticket filter and sort utilites built with RxJS
- Decoupled microservices backend using AWS SNS/SQS for ansychronous communication
- All services containerized and running in Kubernetes cluster
- Utilizes github actions to run workflows that run unit tests on pull request merge to main, and redeploy containers with changed code in production
- Code shared between backend services using common npm library
