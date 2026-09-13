{
  description = "Vocab Tester";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    flake-parts.url = "github:hercules-ci/flake-parts";

    devshell.url = "github:numtide/devshell";
    devshell.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = inputs @ { flake-parts, ... }: flake-parts.lib.mkFlake { inherit inputs; } ({ lib, ... }: {
    imports = [ inputs.devshell.flakeModule ];

    systems = lib.systems.flakeExposed;

    perSystem = { pkgs, system, inputs', ... }:
      let
        web = [ pkgs.nodejs_26 ];
      in
      {
        devshells = {
          default = {
            env = [
              { name = "PATH"; prefix = "./node_modules/.bin"; }
            ];
            packages = web;
          };
        };
      };
  });
}
