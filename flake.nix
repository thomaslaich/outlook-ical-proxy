{
  description = "A simple Azure function that acts as a proxy to Outlook ical";

  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    treefmt-nix.url = "github:numtide/treefmt-nix";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    inputs@{ flake-parts, treefmt-nix, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [ treefmt-nix.flakeModule ];
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];
      perSystem =
        {
          config,
          self',
          inputs',
          pkgs,
          lib,
          system,
          ...
        }:
        {
          treefmt = import ./treefmt.nix { inherit lib pkgs; };

          packages.default = pkgs.hello;

          devShells.default = pkgs.mkShell {
            packages = with pkgs; [
              nodejs_20
              azure-functions-core-tools
              azure-cli
              just
            ];
          };
        };
      flake = { };
    };
}
