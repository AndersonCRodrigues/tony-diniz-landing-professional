# Padronização dos retratos dos alunos

## Objetivo

As fotografias de origem apresentam distâncias de câmera e alturas dos rostos diferentes, mesmo com dimensões idênticas. Para garantir consistência nos cartões, cada imagem recebe um recorte próprio, respeitando o enquadramento do rosto e dos ombros.

As fotos-fonte possuem **848 × 1264 pixels**. Os arquivos entregues para a aplicação têm **480 × 600 pixels, proporção 4:5**, em WebP. Não são aplicadas deformações geométricas ou técnicas generativas. Os recortes são feitos diretamente dos JPEGs originais, preservados em `assets/fotos-originais/`.

## Coordenadas de recorte

As coordenadas seguem a convenção do Pillow `(x0, y0, x1, y1)`, em pixels sobre a fotografia-fonte.

| Aluno | Original | Corte | Saída |
| --- | --- | --- | --- |
| João | `assets/fotos-originais/aluno-1.jpeg` | `(245, 250, 585, 675)` | `public/alunos/aluno-1.webp` |
| Fabiano Marques | `assets/fotos-originais/aluno-2.jpeg` | `(296, 245, 596, 620)` | `public/alunos/aluno-2.webp` |
| Marcela Oliveira | `assets/fotos-originais/aluno-3.jpeg` | `(245, 255, 585, 680)` | `public/alunos/aluno-3.webp` |
| Juliana Santos | `assets/fotos-originais/aluno-4.jpeg` | `(250, 260, 590, 685)` | `public/alunos/aluno-4.webp` |

## Reproduzir os recortes

```bash
python -m pip install Pillow
python scripts/recortar_fotos.py
```

Os nomes dos arquivos finais são estáveis; ao alterar a fonte ou as coordenadas, execute novamente o script e valide a página. Use `docs/previa-retratos.jpg` como referência para conferir a composição.

Os cards renderizam as fotos em uma área de proporção 4:5, sem recortes adicionais no navegador.
