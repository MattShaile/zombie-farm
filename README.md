# Zombie Farm
Code example project demonstrating a strictly decoupled MVC based game

## Summary

The game uses maven to manage its dependencies (through a private artifact repository), so it would be difficult to get a build running without access to said repository (which is currently running on a local linux box)

The game is 'compiled' using the Google Closure compiler.

PureMVC is used to organise everything into the model, view and controller domains.

CreateJS is used to render the graphics.

This project could be done in a far simpler fashion, but it was structured the way it is in order to practise and demonstrate strict decoupling. It was built as an example of this rather than a practical solution to this particular project.
Components can easily be added and removed without affecting anything else. Additional commands can be included or changed, all from the setup classes, in order to completely change the flow of the application.
Models can be replaced in their entirety without making any changes to the views. This is useful for applications which populate their models via different servers.

## Top level folder summary

The modules folder contains core components, such as the preloader, which can be reused across multiple games

The resources folder contains third party libraries and parent poms

The projects folder contains the game code and assets, this is probably the only place you need to look