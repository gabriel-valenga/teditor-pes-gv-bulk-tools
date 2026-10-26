# TEditor GV Bulk Tools

Uma ferramenta JavaScript desenvolvida pela comunidade para editar em massa atributos e habilidades especiais de jogadores no PES 2021 por meio do [TEditor](https://teditor.app/).

O objetivo deste projeto é tornar a edição do banco de dados de jogadores mais rápida e simples, permitindo aplicar alterações a vários jogadores simultaneamente.

## Funcionalidades

- **Edição de atributos em massa:** aumente ou diminua atributos numéricos selecionados usando um valor configurável.
- **Filtro por posição:** selecione todos os jogadores válidos ou filtre-os pelas posições em que estão registrados.
- **Gerenciamento de habilidades especiais:** habilite ou desabilite habilidades especiais selecionadas para vários jogadores.
- **Pré-visualização antes da aplicação:** revise as alterações planejadas antes de confirmá-las.
- **Validação de valores:** respeite os limites de valores permitidos para cada campo.
- **Interface multilíngue:** selecione entre os idiomas de interface disponíveis.
- **Verificação das alterações:** confira se as alterações solicitadas foram aplicadas aos dados atuais do TEditor.

## Requisitos

- Um navegador moderno, como Google Chrome ou Microsoft Edge.
- Acesso ao [TEditor](https://teditor.app/).
- Familiaridade básica com as Ferramentas do Desenvolvedor do navegador e o Console JavaScript.

Não é necessário instalar Node.js, utilizar um gerenciador de pacotes ou executar um processo de compilação (*build*). O script foi desenvolvido para ser executado diretamente no navegador.

## Instalação e utilização

## vídeo demonstrando o processo:
https://youtu.be/4y4vfS4Slqg?si=AegyLe7v-sQKdTd1

### 1. Abra o TEditor

Acesse o [TEditor](https://teditor.app/) e carregue os dados dos jogadores do PES 2021.

**Importante:** faça um backup dos seus dados originais antes de aplicar alterações em massa.

### 2. Abra o Console do navegador

No Google Chrome para Windows ou Linux:

1. Pressione `F12` para abrir as Ferramentas do Desenvolvedor.
2. Selecione a aba **Console**.

Como alternativa, pressione `Ctrl + Shift + J` para abrir o Console diretamente.

Os atalhos podem variar conforme o navegador e o sistema operacional.

### 3. Copie o script

Abra o arquivo `main.js` deste repositório e copie todo o seu conteúdo.

### 4. Autorize a colagem, se necessário

O Chrome pode exibir um aviso de segurança e impedir que você cole código no Console.

Se isso acontecer, digite o seguinte comando diretamente no Console e pressione `Enter`:

`allow pasting`

Isso autoriza a colagem de código no Console. **Essa autorização não verifica se o código é seguro.** Execute apenas scripts nos quais você confia e cujo conteúdo tenha revisado.

Essa confirmação pode não ser necessária em todos os navegadores.

### 5. Execute o script

Cole o conteúdo de `main.js` no Console e pressione `Enter`.

O painel do TEditor GV Bulk Tools deverá aparecer na página do TEditor.

### 6. Configure as alterações

Dependendo das opções disponíveis na versão atual:

1. Selecione os jogadores que deseja editar, utilizando o filtro por posição.
2. Escolha os atributos numéricos que deseja modificar.
3. Defina a quantidade de pontos a adicionar ou subtrair.
4. Selecione as habilidades especiais que deseja habilitar ou desabilitar.
5. Revise a pré-visualização antes de aplicar as alterações.

### 7. Verifique e salve

Depois de aplicar as alterações, confira os resultados no TEditor.

**Você precisa salvar ou exportar os dados manualmente usando as funcionalidades do próprio TEditor.** A execução do script não baixa nem salva automaticamente um arquivo modificado no seu computador.

Evite recarregar a página ou fechar o editor antes de salvar seu trabalho.

## Atributos numéricos e limites de valores

Campos diferentes possuem intervalos de valores válidos diferentes. A ferramenta deve validar cada campo de acordo com seus próprios limites, em vez de presumir que todos os valores numéricos utilizam o mesmo intervalo.

### Atributos padrão dos jogadores

A maioria dos atributos padrão dos jogadores utiliza o intervalo de **40 a 99**.

Entre eles estão:

- Capacidade Ofensiva (*Attacking Prowess*)
- Controle de Bola (*Ball Control*)
- Posse de Bola (*Tight Possession*)
- Passe Rasteiro (*Low Pass*)
- Passe Alto (*Lofted Pass*)
- Finalização (*Finishing*)
- Cobrança de Faltas (*Place Kicking*)
- Efeito (*Curl*)
- Velocidade (*Speed*)
- Aceleração (*Acceleration*)
- Impulsão (*Jump*)
- Contato Físico (*Physical Contact*)
- Equilíbrio (*Balance*)
- Resistência (*Stamina*)
- Desarme / Recuperação de Bola (*Ball Winning*)
- Agressividade (*Aggression*)
- Consciência de Goleiro (*Goalkeeper Awareness*)
- Defesa do Goleiro (*Goalkeeper Catching*)
- Alcance do Goleiro (*Goalkeeper Reach*)
- Capacidade Defensiva (*Defensive Prowess*)
- Rebatida do Goleiro (*Goalkeeper Clearing*)
- Cabeceio (*Heading Ability*)
- Drible (*Dribbling*)
- Reflexos do Goleiro (*Goalkeeper Reflexes*)
- Força do Chute (*Kicking Power*)

Por exemplo, se a Velocidade de um jogador é 90 e você aumenta esse atributo em 5 pontos, o resultado deverá ser 95. Se o valor atual for 97 e você adicionar mais 5 pontos, o resultado não poderá ultrapassar o limite máximo de 99.

### Campos com limites diferentes

| Campo | Intervalo válido | Descrição |
|---|---:|---|
| Uso do Pé Ruim (*Weak Foot Usage*) | 1–4 | Frequência com que o jogador utiliza o pé mais fraco. |
| Precisão do Pé Ruim (*Weak Foot Accuracy*) | 1–4 | Precisão do jogador ao utilizar o pé mais fraco. |
| Forma / Condição (*Form / Conditioning*) | 1–8 | Valor relacionado à condição e à consistência do jogador. |
| Resistência a Lesões (*Injury Resistance*) | 1–3 | Valor relacionado à resistência do jogador a lesões. |
| Idade (*Age*) | 15–50 | Idade do jogador em anos. |
| Altura (*Height*) | 155–210 | Altura do jogador em centímetros. |
| Peso (*Weight*) | 30–129 | Peso do jogador em quilogramas. |
| Atitude (*Attitude*) | 1–3 | Valor de atitude representado no editor. |
| Reputação (*Reputation*) | 1–8 | Valor de reputação representado no editor. |

Esses intervalos refletem os limites identificados durante o desenvolvimento e devem ser conferidos com a versão atual do TEditor.

### Campos excluídos da edição padrão de atributos

O seletor padrão de atributos foi projetado para editar os atributos dos jogadores, e não todos os campos existentes no banco de dados.

Exemplos de campos que devem permanecer fora do seletor padrão:

- IDs dos jogadores e outros identificadores.
- IDs de países e nomes de chamada.
- Configurações de comemorações de gol.
- Configurações de animações e movimentos.
- Campos de metadados internos.

Outros campos, como idade, altura, peso e reputação, possuem limites próprios e só devem ser disponibilizados por meio de opções específicas, caso sejam suportados.

## Posições dos jogadores

O filtro de posições utiliza os seguintes códigos:

| Código | Posição |
|---|---|
| GK | Goleiro |
| CB | Zagueiro central |
| DMF | Volante |
| CMF | Meio-campista central |
| LB | Lateral-esquerdo |
| AMF | Meio-campista ofensivo |
| RWF | Ponta-direita |
| LWF | Ponta-esquerda |
| RB | Lateral-direito |
| CF | Centroavante |

Selecione as posições que deseja incluir na edição. Se nenhum filtro de posição for aplicado, a ferramenta poderá selecionar todos os jogadores válidos.

A filtragem depende das informações de posição disponíveis no banco de dados carregado.

## Habilidades especiais

As habilidades especiais são diferentes dos atributos numéricos. Em vez de adicionar ou subtrair pontos, o usuário seleciona as habilidades que deseja habilitar ou desabilitar.

Alguns exemplos:

| Habilidade | Descrição |
|---|---|
| Scissors Feint | Habilita o drible conhecido como pedalada. |
| Double Touch | Habilita o drible de dois toques. |
| Flip Flap | Habilita o drible conhecido como elástico. |
| Marseille Turn | Habilita o giro de Marselha. |
| Sombrero | Habilita o drible conhecido como chapéu. |
| Heading Skill | Habilita a habilidade especial de cabeceio. |
| Long Range Drive | Habilita a habilidade de chute potente de longa distância. |
| Chip Shot Control | Habilita a habilidade de controle de chutes por cobertura. |
| Long Range Shooting | Habilita a habilidade de finalização de longa distância. |
| Knuckle Shot | Habilita o chute de folha seca. |
| Dipping Shot | Habilita o chute com trajetória descendente. |
| Rising Shot | Habilita o chute com trajetória ascendente. |
| Acrobatic Finishing | Habilita finalizações acrobáticas. |
| Heel Trick | Habilita a habilidade de passes e chutes de calcanhar. |
| First-time Shot | Habilita a habilidade de finalização de primeira. |
| One-touch Pass | Habilita a habilidade de passe de primeira. |
| Through Passing | Habilita a habilidade de passe em profundidade. |
| Weighted Pass | Habilita a habilidade de passe com trajetória ajustada. |
| Pinpoint Crossing | Habilita a habilidade de cruzamentos precisos. |
| Outside Curler | Habilita a habilidade de passe e chute com a parte externa do pé. |
| Rabona | Habilita a habilidade de passe e chute de rabona. |
| No Look Pass | Habilita a habilidade de passe sem olhar. |
| Low Lofted Pass | Habilita a habilidade de passe alto com trajetória baixa. |
| GK Low Punt | Habilita a habilidade de reposição rasteira do goleiro. |
| GK High Punt | Habilita a habilidade de reposição alta do goleiro. |
| Long Throw | Habilita a habilidade de arremesso lateral longo. |
| GK Long Throw | Habilita a habilidade de lançamento longo do goleiro. |
| Penalty Specialist | Habilita a habilidade de especialista em pênaltis. |
| GK Penalty Saver | Habilita a habilidade de defesa de pênaltis do goleiro. |
| Gamesmanship | Habilita a habilidade de cavar faltas. |
| Man Marking | Habilita a habilidade de marcação individual. |
| Track Back | Habilita a habilidade de recomposição defensiva. |
| Interception | Habilita a habilidade de interceptação. |
| Acrobatic Clear | Habilita a habilidade de afastamento acrobático da bola. |
| Captaincy | Habilita a habilidade de liderança. |
| Super-sub | Habilita a habilidade de super-reserva. |
| Fighting Spirit | Habilita a habilidade de espírito de luta. |

Outras habilidades suportadas podem incluir capacidades adicionais relacionadas a dribles, passes, finalizações, defesa e movimentação.

As descrições são explicações resumidas dos nomes das habilidades, não uma especificação completa de suas mecânicas no PES 2021.

## Fórmula do Overall

A nota Overall depende dos atributos do jogador e da posição avaliada. Cada posição utiliza pesos próprios para os atributos, e jogadores de linha também usam uma pontuação geral complementar. A documentação detalha os pesos dos atributos, os cálculos intermediários, os ajustes por posição, os arredondamentos e a fórmula final.

Consulte a **[documentação detalhada da fórmula do Overall](docs/overall-formula.pt-BR.md)** para entender como o cálculo funciona.

## Fluxo de utilização recomendado

1. Carregue o arquivo .ted do time exportado do PES 2021 no TEditor.
2. Faça um backup dos dados originais.
3. Selecione os jogadores que deseja modificar.
4. Escolha os atributos numéricos ou as habilidades especiais.
5. Configure as alterações desejadas.
6. Revise cuidadosamente a pré-visualização.
7. Aplique as alterações.
8. Verifique os valores resultantes no TEditor.
9. Salve ou exporte os dados modificados usando as funcionalidades do próprio TEditor.

Ao editar um grande grupo de jogadores, prefira alterações pequenas e confira a pré-visualização antes de confirmar. Alterações em massa podem afetar muitos jogadores simultaneamente.

## Limitações

- **Dependência do TEditor:** o script depende da estrutura da página e do armazenamento interno de dados do TEditor. Mudanças no TEditor podem exigir atualizações neste projeto.
- **Sessão atual:** o script modifica os dados carregados na sessão atual do navegador.
- **Salvamento manual:** as alterações aplicadas não são salvas automaticamente em um arquivo.
- **Limites específicos por campo:** cada atributo numérico deve ser validado conforme seu próprio intervalo permitido.
- **Dados de posição:** a filtragem depende das informações de posição disponíveis no banco de dados carregado.
- **Escopo do PES 2021:** a ferramenta foi desenvolvida para editar dados de jogadores por meio do TEditor. Ela não se destina a modificar arquivos executáveis do jogo.
- **Projeto independente:** esta é uma ferramenta comunitária independente, não uma funcionalidade oficial do TEditor.
- **Foto do treinador:** ao importar no jogo um arquivo `.ted` exportado pelo TEditor, a foto do treinador pode ser perdida.
- **Configuração do estádio do time**: Ao importar no jogo um arquivo .ted exportado pelo TEditor, a configuração do estádio do time pode ser perdida.
- **Jogadores com rosto e corpo de patch sem tatuagens (ocorre atualmente apenas com patches para PC)**: Ao importar no jogo um arquivo .ted exportado pelo TEditor, a cor da pele do jogador (principalmente nos braços) pode ficar diferente da cor do rosto após a edição. Nesse caso, evite editar esse jogador pelo TEditor. Como alternativa, restaure o arquivo .ted de backup no jogo, transfira o jogador para outro time antes de exportar novamente o arquivo .ted e edite o arquivo do time com o script de edição em massa no TEditor. Depois, faça as alterações desse jogador manualmente no editor interno do jogo e transfira-o de volta para o time original.

## Solução de problemas

### O painel não aparece

- Confirme se o TEditor está aberto e se os dados dos jogadores foram carregados.
- Verifique se há erros de JavaScript no Console.
- Confirme se você copiou todo o conteúdo do arquivo `main.js`.
- Verifique se o script é compatível com a versão atual do TEditor.

### O Chrome não permite colar o código

Se o Chrome exibir um aviso sobre a colagem de código, digite `allow pasting` diretamente no Console e pressione `Enter`. Depois, cole o script.

Nunca execute código desconhecido apenas para contornar um aviso de segurança do navegador.

### As alterações não aparecem no arquivo salvo

Aplicar as alterações no painel não significa que elas foram salvas em disco. Depois de conferir os resultados, utilize as funcionalidades de salvamento ou exportação do TEditor.

## Contribuições

Contribuições, relatos de erros e sugestões são bem-vindos.

Ao relatar um problema, inclua:

- O navegador e a versão utilizados.
- As etapas necessárias para reproduzir o problema.
- O atributo ou a habilidade especial afetada.
- O comportamento esperado e o resultado observado.
- Mensagens de erro relevantes exibidas no Console.

Evite compartilhar informações pessoais ou bancos de dados de jogadores modificados que você não tenha autorização para distribuir.

## Aviso legal

Este é um projeto comunitário independente, sem vínculo ou endosso dos desenvolvedores do TEditor ou da Konami.

PES e os nomes relacionados são marcas registradas de seus respectivos proprietários. Este projeto tem como objetivo fornecer uma ferramenta comunitária para edição de dados de jogadores.

## Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.