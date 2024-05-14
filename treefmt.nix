{ pkgs, lib, ... }:
{
  projectRootFile = "flake.nix";

  programs.nixfmt-rfc-style.enable = true;
  programs.just.enable = true;
  programs.yamlfmt.enable = true;
  programs.prettier.enable = true;
  programs.prettier.includes = [
    "*.ts"
    "*.json"
    "*.md"
  ];
}
