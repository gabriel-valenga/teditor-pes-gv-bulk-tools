# Fórmula detalhada do Overall

Este documento descreve a fórmula implementada pelo PES GV Bulk Tools na seção `PES GV — OVERALL CALCULATION` de `main.js`. A implementação foi reconstruída a partir do JavaScript inspecionado do TEditor para reproduzir seu cálculo; não é uma fórmula oficial publicada pela Konami.

## Visão geral

Para jogadores de linha, o resultado depende de duas pontuações: uma pontuação específica da posição e uma pontuação geral transformada. Os pesos mudam conforme a posição. O Overall final é limitado a um mínimo de 40.

O fluxo usado pelo código é:

1. Calcular a **pontuação posicional** usando os pesos da posição-alvo.
2. Se a posição-alvo for diferente da posição registrada e houver familiaridade `A` ou `B`, aplicar o bônus de familiaridade e finalizar o cálculo.
3. Caso contrário, somar o ajuste fixo da posição.
4. Para jogadores de linha, combinar 60% da pontuação ajustada por posição e 40% da pontuação geral transformada. Para goleiros, usar a pontuação posicional ajustada, sem essa combinação.
5. Aplicar o mínimo de 40.

## 1. Pontuação posicional: o que significa cada peso?

Cada atributo tem um **peso específico para cada posição**. O peso é um coeficiente usado na soma, não uma porcentagem direta nem a quantidade de pontos que será adicionada ao Overall. Um peso maior significa que diferenças naquele atributo influenciam mais a pontuação posicional daquela posição.

Para cada atributo normal, o código usa a diferença entre o valor do atributo e 25, multiplicada pelo peso. `weakFootAccuracy` é a exceção: usa o valor menos 1. Em notação simplificada:

```text
contribuição do atributo = (valor do atributo − referência) × peso
referência = 25 para os atributos normais
referência = 1 para weakFootAccuracy
pontuação posicional = truncar((soma das contribuições + 50) / 100)
```

O código soma as contribuições dos atributos da tabela da posição. Atributos que não aparecem na tabela têm peso zero naquela posição e, portanto, não afetam a pontuação posicional. Eles ainda podem afetar a pontuação geral descrita na seção 2.

### Pesos por posição

As tabelas abaixo listam os pesos não nulos que aparecem no código. O nome técnico entre crases é a chave usada no objeto de jogador pelo TEditor.

### Goleiro (GK)
| Atributo | Peso |
|---|---:|
| Salto (`jump`) | 11 |
| Contato físico (`physicalContact`) | 11 |
| Consciência de goleiro (`gkAwareness`) | 50 |
| Reflexos do goleiro (`gkReflexes`) | 48 |

Para o cálculo posicional de goleiros, `gkAwareness` é o peso aplicado à média de Consciência e Alcance; `gkReflexes` é o peso aplicado à média de Encaixe, Rebatida e Reflexos.

### Zagueiro (CB)
| Atributo | Peso |
|---|---:|
| Cabeceio (`headingAbility`) | 22 |
| Velocidade (`speed`) | 10 |
| Salto (`jump`) | 19 |
| Contato físico (`physicalContact`) | 19 |
| Resistência (`stamina`) | 9 |
| Defesa (`defensiveProwess`) | 25 |
| Desarme / recuperação (`ballWinning`) | 17 |
| Agressividade (`aggression`) | 8 |
| Precisão com o pé ruim (`weakFootAccuracy`) | 23 |

### Lateral esquerdo (LB)
| Atributo | Peso |
|---|---:|
| Ataque (`attackingProwess`) | 6 |
| Controle de bola (`ballControl`) | 9 |
| Drible (`dribbling`) | 9 |
| Condução / posse apertada (`tightPossession`) | 5 |
| Passe alto (`loftedPass`) | 14 |
| Velocidade (`speed`) | 16 |
| Aceleração (`acceleration`) | 14 |
| Salto (`jump`) | 11 |
| Contato físico (`physicalContact`) | 8 |
| Equilíbrio (`balance`) | 4 |
| Resistência (`stamina`) | 14 |
| Defesa (`defensiveProwess`) | 14 |
| Desarme / recuperação (`ballWinning`) | 8 |
| Agressividade (`aggression`) | 5 |
| Precisão com o pé ruim (`weakFootAccuracy`) | 56 |

### Lateral direito (RB)
| Atributo | Peso |
|---|---:|
| Ataque (`attackingProwess`) | 6 |
| Controle de bola (`ballControl`) | 9 |
| Drible (`dribbling`) | 9 |
| Condução / posse apertada (`tightPossession`) | 5 |
| Passe alto (`loftedPass`) | 14 |
| Velocidade (`speed`) | 16 |
| Aceleração (`acceleration`) | 14 |
| Salto (`jump`) | 11 |
| Contato físico (`physicalContact`) | 8 |
| Equilíbrio (`balance`) | 4 |
| Resistência (`stamina`) | 14 |
| Defesa (`defensiveProwess`) | 14 |
| Desarme / recuperação (`ballWinning`) | 8 |
| Agressividade (`aggression`) | 5 |
| Precisão com o pé ruim (`weakFootAccuracy`) | 56 |

### Volante (DMF)
| Atributo | Peso |
|---|---:|
| Ataque (`attackingProwess`) | 7 |
| Controle de bola (`ballControl`) | 18 |
| Drible (`dribbling`) | 10 |
| Condução / posse apertada (`tightPossession`) | 5 |
| Passe rasteiro (`lowPass`) | 18 |
| Passe alto (`loftedPass`) | 19 |
| Curva (`curl`) | 12 |
| Velocidade (`speed`) | 3 |
| Aceleração (`acceleration`) | 3 |
| Salto (`jump`) | 5 |
| Contato físico (`physicalContact`) | 9 |
| Equilíbrio (`balance`) | 4 |
| Resistência (`stamina`) | 14 |
| Defesa (`defensiveProwess`) | 7 |
| Desarme / recuperação (`ballWinning`) | 3 |
| Agressividade (`aggression`) | 1 |
| Precisão com o pé ruim (`weakFootAccuracy`) | 23 |

### Meio-campista central (CMF)
| Atributo | Peso |
|---|---:|
| Ataque (`attackingProwess`) | 5 |
| Controle de bola (`ballControl`) | 23 |
| Drible (`dribbling`) | 16 |
| Condução / posse apertada (`tightPossession`) | 8 |
| Passe rasteiro (`lowPass`) | 23 |
| Passe alto (`loftedPass`) | 21 |
| Velocidade (`speed`) | 4 |
| Aceleração (`acceleration`) | 6 |
| Contato físico (`physicalContact`) | 3 |
| Equilíbrio (`balance`) | 2 |
| Resistência (`stamina`) | 17 |
| Defesa (`defensiveProwess`) | 3 |
| Precisão com o pé ruim (`weakFootAccuracy`) | 23 |

### Meia pela esquerda (LMF)
| Atributo | Peso |
|---|---:|
| Ataque (`attackingProwess`) | 7 |
| Controle de bola (`ballControl`) | 15 |
| Drible (`dribbling`) | 17 |
| Condução / posse apertada (`tightPossession`) | 8 |
| Passe rasteiro (`lowPass`) | 7 |
| Passe alto (`loftedPass`) | 12 |
| Curva (`curl`) | 4 |
| Velocidade (`speed`) | 24 |
| Aceleração (`acceleration`) | 21 |
| Resistência (`stamina`) | 13 |
| Precisão com o pé ruim (`weakFootAccuracy`) | 56 |

### Meia pela direita (RMF)
| Atributo | Peso |
|---|---:|
| Ataque (`attackingProwess`) | 7 |
| Controle de bola (`ballControl`) | 15 |
| Drible (`dribbling`) | 17 |
| Condução / posse apertada (`tightPossession`) | 8 |
| Passe rasteiro (`lowPass`) | 7 |
| Passe alto (`loftedPass`) | 12 |
| Curva (`curl`) | 4 |
| Velocidade (`speed`) | 24 |
| Aceleração (`acceleration`) | 21 |
| Resistência (`stamina`) | 13 |
| Precisão com o pé ruim (`weakFootAccuracy`) | 56 |

### Meia ofensivo (AMF)
| Atributo | Peso |
|---|---:|
| Ataque (`attackingProwess`) | 14 |
| Controle de bola (`ballControl`) | 23 |
| Drible (`dribbling`) | 17 |
| Condução / posse apertada (`tightPossession`) | 7 |
| Passe rasteiro (`lowPass`) | 21 |
| Passe alto (`loftedPass`) | 14 |
| Finalização (`finishing`) | 17 |
| Velocidade (`speed`) | 5 |
| Aceleração (`acceleration`) | 7 |
| Contato físico (`physicalContact`) | 2 |
| Equilíbrio (`balance`) | 3 |
| Resistência (`stamina`) | 3 |
| Precisão com o pé ruim (`weakFootAccuracy`) | 37 |

### Ponta esquerda (LWF)
| Atributo | Peso |
|---|---:|
| Ataque (`attackingProwess`) | 17 |
| Controle de bola (`ballControl`) | 19 |
| Drible (`dribbling`) | 15 |
| Condução / posse apertada (`tightPossession`) | 7 |
| Passe rasteiro (`lowPass`) | 5 |
| Passe alto (`loftedPass`) | 9 |
| Finalização (`finishing`) | 11 |
| Velocidade (`speed`) | 15 |
| Aceleração (`acceleration`) | 15 |
| Força do chute (`kickingPower`) | 5 |
| Contato físico (`physicalContact`) | 2 |
| Equilíbrio (`balance`) | 4 |
| Resistência (`stamina`) | 6 |
| Precisão com o pé ruim (`weakFootAccuracy`) | 47 |

### Ponta direita (RWF)
| Atributo | Peso |
|---|---:|
| Ataque (`attackingProwess`) | 17 |
| Controle de bola (`ballControl`) | 19 |
| Drible (`dribbling`) | 15 |
| Condução / posse apertada (`tightPossession`) | 7 |
| Passe rasteiro (`lowPass`) | 5 |
| Passe alto (`loftedPass`) | 9 |
| Finalização (`finishing`) | 11 |
| Velocidade (`speed`) | 15 |
| Aceleração (`acceleration`) | 15 |
| Força do chute (`kickingPower`) | 5 |
| Contato físico (`physicalContact`) | 2 |
| Equilíbrio (`balance`) | 4 |
| Resistência (`stamina`) | 6 |
| Precisão com o pé ruim (`weakFootAccuracy`) | 47 |

### Segundo atacante (SS)
| Atributo | Peso |
|---|---:|
| Ataque (`attackingProwess`) | 15 |
| Controle de bola (`ballControl`) | 19 |
| Drible (`dribbling`) | 13 |
| Condução / posse apertada (`tightPossession`) | 6 |
| Passe rasteiro (`lowPass`) | 9 |
| Passe alto (`loftedPass`) | 9 |
| Finalização (`finishing`) | 14 |
| Velocidade (`speed`) | 9 |
| Aceleração (`acceleration`) | 21 |
| Força do chute (`kickingPower`) | 6 |
| Contato físico (`physicalContact`) | 2 |
| Equilíbrio (`balance`) | 5 |
| Resistência (`stamina`) | 4 |
| Precisão com o pé ruim (`weakFootAccuracy`) | 37 |

### Centroavante (CF)
| Atributo | Peso |
|---|---:|
| Ataque (`attackingProwess`) | 31 |
| Controle de bola (`ballControl`) | 23 |
| Drible (`dribbling`) | 9 |
| Condução / posse apertada (`tightPossession`) | 5 |
| Finalização (`finishing`) | 36 |
| Cabeceio (`headingAbility`) | 3 |
| Velocidade (`speed`) | 5 |
| Aceleração (`acceleration`) | 5 |
| Força do chute (`kickingPower`) | 3 |
| Salto (`jump`) | 3 |
| Contato físico (`physicalContact`) | 8 |
| Equilíbrio (`balance`) | 2 |
| Precisão com o pé ruim (`weakFootAccuracy`) | 38 |

## 2. Pontuação geral

A pontuação geral é calculada separadamente da pontuação posicional. O código soma estes 22 valores:

- Os 20 atributos gerais listados em `OVERALL_ATTRIBUTES`, **exceto** `weakFootAccuracy`.
- A média inteira de `gkAwareness` e `gkReach`.
- A média inteira de `gkCatching`, `gkClearing` e `gkReflexes`.

As médias dos atributos de goleiro são truncadas para inteiro. Em seguida, a soma é dividida por 22 e arredondada para o inteiro mais próximo, usando a aritmética inteira do código:

```text
média de consciência/alcance = truncar((gkAwareness + gkReach) / 2)
média de encaixe/rebatida/reflexos = truncar((gkCatching + gkClearing + gkReflexes) / 3)
pontuação geral = truncar((truncar(soma dos 22 valores × 100 / 22) + 50) / 100)
```

### Transformação da pontuação geral

O resultado não é usado diretamente. O código aplica o ajuste abaixo:

| Pontuação geral antes do ajuste | Valor somado à pontuação geral |
|---:|---:|
| 61 ou menos | −9 |
| 62 | −6 |
| 63 | −4 |
| 64 | −2 |
| 65 | 0 |
| 66 | +1 |
| 67 | +3 |
| 68 | +5 |
| 69 | +6 |
| 70 | +7 |
| 71 | +8 |
| 72–73 | +10 |
| 74–75 | +12 |
| 76–77 | +13 |
| 78 ou mais | +14 |

Exemplo: se a pontuação geral for 70, a pontuação transformada será 77 (70 + 7). Os limites são aplicados em ordem crescente, como na função `transformGeneralScore`.

## 3. Ajustes e cálculo final

### Ajuste fixo por posição

Quando não é aplicado o bônus de familiaridade `A`/`B`, o código soma o seguinte ajuste à pontuação posicional:

| Posição | Ajuste fixo |
|---|---:|
| GK | +8 |
| CB | +8 |
| LB, RB, DMF | +9 |
| CMF, LMF, RMF, AMF | +8 |
| LWF, RWF | +10 |
| SS | +9 |
| CF | +8 |

### Bônus de familiaridade para posição diferente da registrada

Se a posição-alvo for diferente da posição registrada, o código verifica o campo de familiaridade daquela posição. Se for `A` ou `B`, o cálculo termina com a pontuação posicional mais o bônus abaixo. Nesse caminho, **não** são aplicados o ajuste fixo nem a combinação 60/40.

| Posição-alvo | Familiaridade A | Familiaridade B |
|---|---:|---:|
| GK | +5 | +3 |
| CB | +5 | +3 |
| LB | +4 | +2 |
| RB | +4 | +2 |
| DMF | +4 | +2 |
| CMF | +5 | +3 |
| LMF | +5 | +3 |
| RMF | +5 | +3 |
| AMF | +5 | +3 |
| LWF | +4 | +2 |
| RWF | +4 | +2 |
| SS | +5 | +3 |
| CF | +5 | +3 |

Se não houver bônus `A`/`B` aplicável, o código segue pelo ajuste fixo normal.

### Jogadores de linha

Para uma posição de linha, depois do ajuste fixo, o Overall é calculado assim:

```text
pontuação ajustada = pontuação posicional + ajuste fixo da posição
Overall = truncar((pontuação ajustada × 60 + pontuação geral transformada × 40 + 50) / 100)
```

Isso corresponde aproximadamente a 60% da pontuação posicional ajustada e 40% da pontuação geral transformada, com o arredondamento inteiro reproduzido do código.

### Goleiros

Para `GK`, depois do ajuste fixo de +8, o resultado é a pontuação posicional ajustada. O código não mistura esse valor com a pontuação geral transformada.

### Limite mínimo

Nos caminhos normais, o resultado final é `max(resultado, 40)`. Assim, o Overall calculado não fica abaixo de 40. O código não aplica neste trecho um limite máximo explícito de 100.

## 4. Exemplo ilustrativo da ponderação

Imagine dois jogadores com a mesma posição-alvo e os mesmos valores em todos os atributos, exceto Velocidade. Para um `CF`, Velocidade tem peso 5; para um `LMF`, tem peso 24. Portanto, a mesma diferença de Velocidade gera uma contribuição posicional maior para `LMF` do que para `CF`. Isso **não** significa que aumentar Velocidade em 1 ponto aumentará o Overall final em 24 pontos: o peso participa de uma soma escalada por 100, seguida de arredondamento e, para jogadores de linha, da combinação 60/40.

## 5. Campos usados

- Atributos gerais usados na pontuação posicional: `attackingProwess`, `ballControl`, `dribbling`, `tightPossession`, `lowPass`, `loftedPass`, `finishing`, `headingAbility`, `placeKicking`, `curl`, `speed`, `acceleration`, `kickingPower`, `jump`, `physicalContact`, `balance`, `stamina`, `defensiveProwess`, `ballWinning`, `aggression` e `weakFootAccuracy`.
- Atributos de goleiro: `gkAwareness`, `gkReach`, `gkCatching`, `gkClearing` e `gkReflexes`.
- A familiaridade é lida de um campo específico para a posição-alvo, como `positionCb`, `positionDmf` ou `positionCf`.

Se algum campo numérico necessário não estiver disponível ou não puder ser convertido em número, a implementação retorna `null` para o cálculo, em vez de fabricar um Overall.

## 6. Relação com a reputação

Quando a opção **Reputação por Overall** está ativada, o PES GV calcula o Overall usando os atributos resultantes das alterações planejadas e então usa esse Overall para determinar a faixa de reputação configurada pelo usuário. A reputação não participa do cálculo do Overall; é um resultado separado derivado dele.

## Observações de manutenção

- Os pesos e as regras acima refletem a implementação atual de `main.js`. Se o código do TEditor mudar, revise e compare novamente esta documentação.
- O arredondamento/truncamento faz parte da fórmula; trocar por uma média decimal simples pode produzir resultados diferentes.
- Esta documentação explica o comportamento reproduzido no projeto, não afirma que todos os jogos ou editores PES usem a mesma fórmula.
