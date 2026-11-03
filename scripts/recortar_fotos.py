#!/usr/bin/env python3
"""Exporta os retratos dos quatro alunos em WebP 4:5 a partir dos JPEGs recebidos.

Reproduza os mesmos enquadramentos sem qualquer IA ou deformação:
  python -m pip install Pillow
  python scripts/recortar_fotos.py

Os arquivos em public/alunos/ já vêm prontos. O build React não requer Python.
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
FONTE = ROOT / "assets" / "fotos-originais"
SAIDA = ROOT / "public" / "alunos"
DIMENSAO_ORIGINAL = (848, 1264)
TAMANHO_FINAL = (480, 600)

# Posições verificadas visualmente nas novas fotos do cliente.
# Cada corte concentra o rosto e os ombros, sem preencher áreas externas.
# O enquadramento de Fabiano é ligeiramente mais fechado para compensar a
# menor escala do rosto na foto original, mantendo o mesmo padrão 4:5.
CORTES = {
    1: (245, 250, 585, 675),  # João
    2: (296, 245, 596, 620),  # Fabiano Marques
    3: (245, 255, 585, 680),  # Marcela Oliveira
    4: (250, 260, 590, 685),  # Juliana Santos
}


def executar():
    SAIDA.mkdir(parents=True, exist_ok=True)
    for indice, caixa in CORTES.items():
        origem = FONTE / f"aluno-{indice}.jpeg"
        saida = SAIDA / f"aluno-{indice}.webp"
        with Image.open(origem) as foto:
            foto = ImageOps.exif_transpose(foto).convert("RGB")
            if foto.size != DIMENSAO_ORIGINAL:
                raise ValueError(f"Dimensões inesperadas para {origem.name}: {foto.size}")
            x0, y0, x1, y1 = caixa
            w, h = x1 - x0, y1 - y0
            if w * 5 != h * 4 or not (0 <= x0 < x1 <= foto.width and 0 <= y0 < y1 <= foto.height):
                raise ValueError(f"Recorte inválido ou fora da proporção 4:5: {origem.name}: {caixa}")
            retrato = foto.crop(caixa).resize(TAMANHO_FINAL, Image.Resampling.LANCZOS)
            retrato.save(saida, "WEBP", quality=91, method=6)
            print(f"{origem.name}: {caixa} -> {saida.relative_to(ROOT)} ({TAMANHO_FINAL[0]}×{TAMANHO_FINAL[1]})")


if __name__ == "__main__":
    executar()
