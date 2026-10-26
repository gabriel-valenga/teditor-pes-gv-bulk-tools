(() => {
  const SCRIPT_VERSION = "1.2.0";

  function findTEditorStore() {
    const rootEl = document.getElementById("root");
    if (!rootEl) return null;

    const key = Object.keys(rootEl).find(
      k => k.startsWith("__reactContainer$")
    );
    if (!key) return null;

    const fiber = rootEl[key];
    const start = fiber?.stateNode?.current || fiber;
    const stack = [start];
    const seen = new Set();

    while (stack.length) {
      const node = stack.pop();

      if (!node || seen.has(node)) continue;
      seen.add(node);

      const store = node.memoizedProps?.store;

      if (store && typeof store.getState === "function"
          && typeof store.dispatch === "function") {
        const state = store.getState();

        if (state?.pes2020Data?.editedData?.players) {
          return store;
        }
      }

      if (node.child) stack.push(node.child);
      if (node.sibling) stack.push(node.sibling);
    }

    return null;
  }

  const store = findTEditorStore();

  if (!store) {
    alert("TEditor store not found. Make sure a .ted file is loaded.");
    return;
  }

  document.getElementById("pes-bulk-editor")?.remove();

  const positions = ["GK", "CB", "DMF", "CMF", "LB", "AMF", "RWF", "LWF", "RB", "CF"];

  const attributes = {
    attackingProwess: ["Talento Ofensivo", "Attacking Prowess", 40, 99],
    ballControl: ["Controle de bola", "Ball Control", 40, 99],
    dribbling: ["Drible", "Dribbling", 40, 99],
    tightPossession: ["Condução firme", "Tight Possession", 40, 99],
    lowPass: ["Passe rasteiro", "Low Pass", 40, 99],
    loftedPass: ["Passe alto", "Lofted Pass", 40, 99],
    finishing: ["Finalização", "Finishing", 40, 99],
    headingAbility: ["Cabeceio", "Heading Ability", 40, 99],
    placeKicking: ["Chute colocado", "Place Kicking", 40, 99],
    curl: ["Curva", "Curl", 40, 99],
    speed: ["Velocidade", "Speed", 40, 99],
    acceleration: ["Aceleração", "Acceleration", 40, 99],
    kickingPower: ["Força do chute", "Kicking Power", 40, 99],
    jump: ["Impulsão", "Jump", 40, 99],
    physicalContact: ["Contato físico", "Physical Contact", 40, 99],
    balance: ["Equilíbrio", "Balance", 40, 99],
    stamina: ["Resistência", "Stamina", 40, 99],
    defensiveProwess: ["Talento defensivo", "Defensive Prowess", 40, 99],
    ballWinning: ["Desarme", "Ball Winning", 40, 99],
    aggression: ["Agressividade", "Aggression", 40, 99],
    gkAwareness: ["Talento de GO", "Goalkeeper Awareness", 40, 99],
    gkCatching: ["Firmeza do GO", "Goalkeeper Catching", 40, 99],
    gkClearing: ["Afast. de bola do GO", "Goalkeeper Clearing", 40, 99],
    gkReflexes: ["Reflexos do GO", "Goalkeeper Reflexes", 40, 99],
    gkReach: ["Alcance do GO", "Goalkeeper Reach", 40, 99],
    weakFootUsage: ["Pior pé [frequência]", "Weak Foot Usage", 1, 4],
    weakFootAccuracy: ["Pior pé [precisão]", "Weak Foot Accuracy", 1, 4],
    form: ["Forma física", "Form / Conditioning", 1, 8],
    injuryResistance: ["Resistência a lesão", "Injury Resistance", 1, 3]
  };

  const skills = {
    scissorsFeint: ["Pedalada simples", "Scissors Feint"],
    doubleTouch: ["Toque duplo", "Double Touch"],
    flipFlap: ["Elástico", "Flip Flap"],
    marseilleTurn: ["360 graus", "Marseille Turn"],
    sombrero: ["Chapéu", "Sombrero"],
    crossOverTurn: ["Corte de calcanhar", "Cross Over Turn"],
    cutBehindAndTurn: ["Puxada de letra", "Cut Behind and Turn"],
    scotchMove: ["Finta de letra", "Scotch Move"],
    stepOnSkillControl: ["Controle de domínio", "Step On Skill Control"],
    headingSkill: ["Cabeçada", "Heading Skill"],
    longRangeDrive: ["Chute de longe", "Long Range Drive"],
    chipShotControl: ["Controle da cavadinha", "Chip Shot Control"],
    longRangeShooting: ["Precisão à distância", "Long Range Shooting"],
    knuckleShot: ["Chute com o peito do pé", "Knuckle Shot"],
    dippingShot: ["Folha seca", "Dipping Shot"],
    risingShot: ["Chute ascendente", "Rising Shot"],
    acrobaticFinishing: ["Finaliz. acrobática", "Acrobatic Finishing"],
    heelTrick: ["Toque de calcanhar", "Heel Trick"],
    firstTimeShot: ["Chute de primeira", "First-time Shot"],
    oneTouchPass: ["Passe de primeira", "One-touch Pass"],
    throughPassing: ["Passe em profundidade", "Through Passing"],
    weightedPass: ["Passe na medida", "Weighted Pass"],
    pinpointCrossing: ["Cruzamento preciso", "Pinpoint Crossing"],
    outsideCurler: ["Curva para fora", "Outside Curler"],
    rabona: ["De letra", "Rabona"],
    noLookPass: ["Passe sem olhar", "No Look Pass"],
    lowLoftedPass: ["Passe aéreo baixo", "Low Lofted Pass"],
    gkLowPunt: ["Repos. baixa do GO", "GK Low Punt"],
    gkHighPunt: ["Reposição alta do GO", "GK High Punt"],
    longThrow: ["Arrem. lateral longo", "Long Throw"],
    gkLongThrow: ["Arrem. longo do GO", "GK Long Throw"],
    penaltySpecialist: ["Especialista em pênalti", "Penalty Specialist"],
    gkPenaltySaver: ["Pegador de pênaltis", "GK Penalty Saver"],
    gamesmanship: ["Malícia", "Gamesmanship"],
    manMarking: ["Marcação ind.", "Man Marking"],
    trackBack: ["Voltar para marcar", "Track Back"],
    interception: ["Interceptação", "Interception"],
    acrobaticClear: ["Afastamento acrobático", "Acrobatic Clear"],
    captaincy: ["Liderança", "Captaincy"],
    superSub: ["Super substituto", "Super-sub"],
    fightingSpirit: ["Espírito guerreiro", "Fighting Spirit"],
    trickster: ["Malandro", "Trickster"],
    mazingRun: ["Drible veloz", "Mazing Run"],
    speedingBullet: ["Rápido como uma bala", "Speeding Bullet"],
    incisiveRun: ["Corrida com gás", "Incisive Run"],
    longBallExpert: ["Perito em bola longa", "Long Ball Expert"],
    earlyCross: ["Cruz. antecip.", "Early Cross"],
    longRanger: ["Batedor Pro", "Long Ranger"]
  };

  const i18n = {
    "pt-BR": {
      language: "Idioma",
      languagePt: "Português (Brasil)",
      languageEn: "English",
      title: "PES GV — Edição em massa",
      close: "Fechar ×",
      intro: "Configure, confira a prévia e só então aplique. Salve o arquivo manualmente no TEditor.",
      saveConfig: "Salvar configurações",
      loadConfig: "Carregar configurações",
      configSaved: "Configurações exportadas para arquivo JSON.",
      configLoaded: "Configurações carregadas com sucesso.",
      configInvalid: "Não foi possível carregar o arquivo: formato inválido ou incompatível.",
      targetsTitle: "1. Jogadores-alvo",
      allPositions: "Todas as posições",
      selectedCount: n => `${n} jogador(es) válido(s) selecionado(s).`,
      selectPosition: "Selecione pelo menos uma posição ou marque todas.",
      attributesTitle: "2. Atributos numéricos",
      addAttribute: "+ Adicionar atributo",
      deltaTitle: "Pontos a adicionar ou retirar",
      removeAttribute: "Remover atributo",
      attributesHelp: "Informe quantos pontos adicionar ou retirar. Os valores serão limitados à faixa de cada atributo.",
      reputationTitle: "4. Reputação por Overall",
      reputationEnabled: "Definir a reputação de cada jogador conforme o Overall calculado.",
      configureReputation: "Configurar faixas…",
      reputationNotConfigured: "Nenhuma faixa configurada",
      reputationBandsSummary: n => `${n} faixa(s) configurada(s)`,
      reputationModalTitle: "Configurar reputação por Overall",
      reputationModalHelp: "Crie de 1 a 8 faixas que cubram o Overall de 40 a 100 sem lacunas ou sobreposições. As faixas de reputação devem começar em 1 e continuar sem lacunas; o valor máximo pode ser menor que 8.",
      overallFrom: "Overall inicial",
      overallTo: "Overall final",
      reputationFrom: "Reputação inicial",
      reputationTo: "Reputação final",
      addReputationBand: "+ Adicionar faixa",
      saveReputationBands: "Salvar faixas",
      cancel: "Cancelar",
      removeBand: "Remover faixa",
      reputationValidation: "Faixas inválidas. Confira a cobertura de Overall 40–100, continuidade da reputação de 1 em diante e a quantidade de valores em cada faixa.",
      reputationField: "Reputação (Overall)",
      skillsTitle: "3. Habilidades especiais",
      skillSearch: "Filtrar habilidades...",
      selectVisible: "Selecionar visíveis",
      clearSkills: "Limpar seleção",
      skillsHelp: "Marque as habilidades desejadas e escolha individualmente marcar ou desmarcar.",
      mark: "Marcar",
      unmark: "Desmarcar",
      noSkills: "Nenhuma habilidade encontrada.",
      preview: "Pré-visualizar",
      apply: "Aplicar alterações",
      noValidPlayers: "Nenhum jogador válido corresponde ao filtro.",
      previewTitle: "Prévia",
      previewSummary: (changes, players) => `Prévia: ${changes} alteração(ões) em ${players} jogador(es).`,
      showingFirst: n => `Exibindo as primeiras 150 de ${n} alterações.`,
      player: "Jogador",
      position: "Posição",
      field: "Campo",
      before: "Antes",
      after: "Depois",
      noChanges: n => `Nenhuma alteração necessária. Jogadores analisados: ${n}.`,
      previewNotApplied: "Confira a prévia. Nada foi alterado ainda.",
      confirm: (changes, players) =>
        `Aplicar ${changes} alteração(ões) em ${players} jogador(es)?\n\nEsta ação altera o estado atual do TEditor. Confira a prévia e mantenha uma cópia de segurança do arquivo.`,
      applied: n => `${n} alteração(ões) aplicadas e verificadas. Salve manualmente no TEditor.`,
      verifyFailed: "A ação foi enviada, mas a verificação não confirmou todas as alterações. Confira os jogadores antes de salvar.",
      applyError: e => `Erro ao aplicar: ${e}`,
      ready: "Painel pronto. Configure as alterações e clique em Pré-visualizar.",
      storeMissing: "Não encontrei window.__teditorStore. Verifique se o TEditor está aberto.",
      playersMissing: "Não encontrei editedData.players no estado atual do TEditor.",
      checked: "Marcada",
      unchecked: "Desmarcada"
    },
    en: {
      language: "Language",
      languagePt: "Português (Brasil)",
      languageEn: "English",
      title: "PES GV — Bulk Player Editor",
      close: "Close ×",
      intro: "Configure your changes, review the preview, and then apply them. Save the file manually in TEditor.",
      saveConfig: "Save configuration",
      loadConfig: "Load configuration",
      configSaved: "Configuration exported to JSON file.",
      configLoaded: "Configuration loaded successfully.",
      configInvalid: "Could not load file: invalid or incompatible format.",
      targetsTitle: "1. Target players",
      allPositions: "All positions",
      selectedCount: n => `${n} valid player(s) selected.`,
      selectPosition: "Select at least one position or choose all positions.",
      attributesTitle: "2. Numerical attributes",
      addAttribute: "+ Add attribute",
      deltaTitle: "Points to add or subtract",
      removeAttribute: "Remove attribute",
      attributesHelp: "Enter how many points to add or subtract. Values will be clamped to each attribute's valid range.",
      reputationTitle: "4. Reputation by Overall",
      reputationEnabled: "Set each player's reputation according to their calculated Overall.",
      configureReputation: "Configure bands…",
      reputationNotConfigured: "No bands configured",
      reputationBandsSummary: n => `${n} band(s) configured`,
      reputationModalTitle: "Configure reputation by Overall",
      reputationModalHelp: "Create 1–8 bands covering Overall 40–100 with no gaps or overlaps. Reputation bands must start at 1 and continue without gaps; the maximum may be below 8.",
      overallFrom: "Overall from",
      overallTo: "Overall to",
      reputationFrom: "Reputation from",
      reputationTo: "Reputation to",
      addReputationBand: "+ Add band",
      saveReputationBands: "Save bands",
      cancel: "Cancel",
      removeBand: "Remove band",
      reputationValidation: "Invalid bands. Check Overall coverage 40–100, contiguous reputation ranges starting at 1, and the number of values in each band.",
      reputationField: "Reputation (Overall)",
      skillsTitle: "3. Special skills",
      skillSearch: "Filter skills...",
      selectVisible: "Select visible",
      clearSkills: "Clear selection",
      skillsHelp: "Select the skills you want to change and choose whether to enable or disable each one.",
      mark: "Enable",
      unmark: "Disable",
      noSkills: "No skills found.",
      preview: "Preview",
      apply: "Apply changes",
      noValidPlayers: "No valid players match the selected filter.",
      previewTitle: "Preview",
      previewSummary: (changes, players) => `Preview: ${changes} change(s) for ${players} player(s).`,
      showingFirst: n => `Showing the first 150 of ${n} changes.`,
      player: "Player",
      position: "Position",
      field: "Field",
      before: "Before",
      after: "After",
      noChanges: n => `No changes required. Players checked: ${n}.`,
      previewNotApplied: "Review the preview. Nothing has been changed yet.",
      confirm: (changes, players) =>
        `Apply ${changes} change(s) to ${players} player(s)?\n\nThis action modifies TEditor's current state. Review the preview and keep a backup of your file.`,
      applied: n => `${n} change(s) applied and verified. Save manually in TEditor.`,
      verifyFailed: "The action was dispatched, but verification did not confirm every change. Check the players before saving.",
      applyError: e => `Error applying changes: ${e}`,
      ready: "Ready. Configure your changes and click Preview.",
      storeMissing: "Could not find window.__teditorStore. Make sure TEditor is open.",
      playersMissing: "Could not find editedData.players in TEditor's current state.",
      checked: "Enabled",
      unchecked: "Disabled"
    }
  };

  let lang = "pt-BR";
  const t = key => i18n[lang][key];
    const attrLabel = key => attributes[key][lang === "pt-BR" ? 0 : 1];
  const skillLabel = key => skills[key][lang === "pt-BR" ? 0 : 1];

  const root = document.createElement("div");
  root.id = "pes-bulk-editor";
  root.style.cssText = [
    "position:fixed", "top:12px", "right:12px", "z-index:2147483647",
    "width:440px", "max-width:calc(100vw - 24px)",
    "max-height:calc(100vh - 24px)", "overflow:auto",
    "background:#fff", "color:#222", "border:2px solid #333",
    "border-radius:10px", "padding:14px",
    "box-shadow:0 4px 24px #0005",
    "font:13px/1.4 Arial,sans-serif"
  ].join(";");

  root.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
      <div><strong id="pbe-title" style="font-size:17px"></strong><div id="pbe-version" style="font-size:11px;color:#666">v${SCRIPT_VERSION}</div></div>
      <button id="pbe-close" type="button"></button>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin:8px 0">
      <label for="pbe-language" id="pbe-language-label"></label>
      <select id="pbe-language" style="padding:4px">
        <option value="pt-BR">Português (Brasil)</option>
        <option value="en">English</option>
      </select>
    </div>
    <p id="pbe-intro" style="margin:6px 0 12px;color:#555"></p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 12px">
      <button id="pbe-save-config" type="button"></button>
      <button id="pbe-load-config" type="button"></button>
      <input id="pbe-config-file" type="file" accept=".json,application/json" style="display:none">
    </div>

    <fieldset style="margin-bottom:12px">
      <legend><b id="pbe-targets-title"></b></legend>
      <label><input id="pbe-all" type="checkbox" checked> <span id="pbe-all-label"></span></label>
      <div id="pbe-positions" style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;margin-top:8px">
        ${positions.map(p => `<label><input type="checkbox" value="${p}" class="pbe-pos" disabled> ${p}</label>`).join("")}
      </div>
      <div id="pbe-target-count" style="margin-top:8px;color:#555"></div>
    </fieldset>

    <fieldset style="margin-bottom:12px">
      <legend><b id="pbe-attributes-title"></b></legend>
      <div id="pbe-attribute-rows"></div>
      <button id="pbe-add-attribute" type="button"></button>
      <p id="pbe-attributes-help" style="margin:6px 0 0;color:#555"></p>
    </fieldset>

    <fieldset style="margin-bottom:12px">
      <legend><b id="pbe-skills-title"></b></legend>
      <input id="pbe-skill-search" style="box-sizing:border-box;width:100%;padding:6px;margin:4px 0 8px">
      <div style="display:flex;gap:8px;margin-bottom:8px">
        <button id="pbe-select-visible" type="button"></button>
        <button id="pbe-clear-skills" type="button"></button>
      </div>
      <div id="pbe-skills" style="max-height:230px;overflow:auto;border:1px solid #ddd;padding:6px"></div>
      <p id="pbe-skills-help" style="margin:6px 0 0;color:#555"></p>
    </fieldset>

    <fieldset style="margin-bottom:12px">
      <legend><b id="pbe-reputation-title"></b></legend>
      <label style="display:flex;gap:7px;align-items:flex-start">
        <input id="pbe-reputation-enabled" type="checkbox" style="margin-top:3px">
        <span id="pbe-reputation-enabled-label"></span>
      </label>
      <div style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap">
        <button id="pbe-configure-reputation" type="button"></button>
        <span id="pbe-reputation-summary" style="color:#555"></span>
      </div>
    </fieldset>

    <div style="display:flex;gap:8px;position:sticky;bottom:0;background:#fff;padding:8px 0">
      <button id="pbe-preview" type="button" style="font-weight:bold"></button>
      <button id="pbe-apply" type="button" disabled></button>
    </div>
    <div id="pbe-status" role="status" style="margin:8px 0"></div>
    <div id="pbe-preview-results"></div>
  `;

  document.body.appendChild(root);

  const $ = selector => root.querySelector(selector);
  const status = (msg, color = "#333") => {
    $("#pbe-status").textContent = msg;
    $("#pbe-status").style.color = color;
  };

  const getPlayers = () => {
    const state = store.getState();
    const players = state?.pes2020Data?.editedData?.players;
    if (!Array.isArray(players)) throw new Error(t("playersMissing"));
    return players;
  };

  const validPlayers = () => getPlayers()
    .map((player, index) => ({ player, index }))
    .filter(({ player }) =>
      Number(player.playerId) > 0 &&
      String(player.playerName || "").trim() !== ""
    );

  function getTargets() {
    const valid = validPlayers();
    if ($("#pbe-all").checked) return valid;

    const selected = [...root.querySelectorAll(".pbe-pos:checked")].map(el => el.value);
    if (!selected.length) throw new Error(t("selectPosition"));

    return valid.filter(({ player }) => selected.includes(player.registeredPosition));
  }

  function refreshTargetCount() {
    try {
      $("#pbe-target-count").textContent = t("selectedCount")(getTargets().length);
    } catch (e) {
      $("#pbe-target-count").textContent = e.message;
    }
  }

  function addAttributeRow(field = "finishing", delta = 0) {
    const row = document.createElement("div");
    row.className = "pbe-attribute-row";
    row.style.cssText = "display:flex;gap:6px;align-items:center;margin:6px 0";
    row.innerHTML = `
      <select class="pbe-attr-field" style="flex:1;min-width:0;padding:5px">
        ${Object.entries(attributes).map(([key, info]) =>
          `<option value="${key}" ${key === field ? "selected" : ""}>${attrLabel(key)} (${info[2]}–${info[3]})</option>`
        ).join("")}
      </select>
      <input class="pbe-attr-delta" type="number" step="1" value="${delta}" title="${t("deltaTitle")}" style="width:76px;padding:5px">
      <button type="button" class="pbe-remove-attr" title="${t("removeAttribute")}">×</button>
    `;
    row.querySelector(".pbe-remove-attr").addEventListener("click", () => {
      row.remove();
      invalidatePlan();
    });
    row.querySelector(".pbe-attr-field").addEventListener("change", invalidatePlan);
    row.querySelector(".pbe-attr-delta").addEventListener("input", invalidatePlan);
    $("#pbe-attribute-rows").appendChild(row);
  }

  // Keep skill selections in a persistent map, including rows hidden by search.
  const skillState = new Map(Object.keys(skills).map(key => [key, { checked: false, action: "true" }]));

  function saveVisibleSkillState() {
    root.querySelectorAll(".pbe-skill-row").forEach(row => {
      skillState.set(row.dataset.skill, {
        checked: row.querySelector(".pbe-skill-check").checked,
        action: row.querySelector(".pbe-skill-action").value
      });
    });
  }

  function renderSkills(
    filter = $("#pbe-skill-search").value,
    saveCurrentState = true
  ) {
    if (saveCurrentState) {
      saveVisibleSkillState();
    }
    const container = $("#pbe-skills");
    const q = filter.trim().toLocaleLowerCase(lang === "pt-BR" ? "pt-BR" : "en");
    const matching = Object.entries(skills)
      .filter(([key]) => `${skillLabel(key)} ${key}`.toLocaleLowerCase(lang === "pt-BR" ? "pt-BR" : "en").includes(q));

    container.innerHTML = matching.map(([key]) => {
      const saved = skillState.get(key) || { checked: false, action: "true" };
      const label = skillLabel(key);
      return `
        <div class="pbe-skill-row" data-skill="${key}" style="display:flex;align-items:center;gap:6px;margin:4px 0">
          <input class="pbe-skill-check" type="checkbox" ${saved.checked ? "checked" : ""}>
          <span style="flex:1">${label}</span>
          <select class="pbe-skill-action" aria-label="${label}" style="padding:3px">
            <option value="true" ${saved.action === "true" ? "selected" : ""}>${t("mark")}</option>
            <option value="false" ${saved.action === "false" ? "selected" : ""}>${t("unmark")}</option>
          </select>
        </div>`;
    }).join("") || `<p>${t("noSkills")}</p>`;

    container.querySelectorAll(".pbe-skill-row").forEach(row => {
      row.querySelector(".pbe-skill-check").addEventListener("change", () => {
        saveVisibleSkillState();
        invalidatePlan();
      });
      row.querySelector(".pbe-skill-action").addEventListener("change", () => {
        saveVisibleSkillState();
        invalidatePlan();
      });
    });
  }

  // ============================================================================
  // PES GV — OVERALL CALCULATION
  // Replicates TEditor's player Overall calculation based on the inspected bundle.
  // Keep this section isolated so the formula can be audited independently.
  // ============================================================================
  const OVERALL_ATTRIBUTES = [
    "attackingProwess", "ballControl", "dribbling", "tightPossession",
    "lowPass", "loftedPass", "finishing", "headingAbility", "placeKicking",
    "curl", "speed", "acceleration", "kickingPower", "jump",
    "physicalContact", "balance", "stamina", "defensiveProwess",
    "ballWinning", "aggression", "weakFootAccuracy"
  ];

  const OVERALL_POSITION_WEIGHTS = {
    GK: { jump: 11, physicalContact: 11, gkAwareness: 50, gkReflexes: 48 },
    CB: { headingAbility: 22, speed: 10, jump: 19, physicalContact: 19, stamina: 9, defensiveProwess: 25, ballWinning: 17, aggression: 8, weakFootAccuracy: 23 },
    LB: { attackingProwess: 6, ballControl: 9, dribbling: 9, tightPossession: 5, loftedPass: 14, speed: 16, acceleration: 14, jump: 11, physicalContact: 8, balance: 4, stamina: 14, defensiveProwess: 14, ballWinning: 8, aggression: 5, weakFootAccuracy: 56 },
    RB: { attackingProwess: 6, ballControl: 9, dribbling: 9, tightPossession: 5, loftedPass: 14, speed: 16, acceleration: 14, jump: 11, physicalContact: 8, balance: 4, stamina: 14, defensiveProwess: 14, ballWinning: 8, aggression: 5, weakFootAccuracy: 56 },
    DMF: { attackingProwess: 7, ballControl: 18, dribbling: 10, tightPossession: 5, lowPass: 18, loftedPass: 19, curl: 12, speed: 3, acceleration: 3, jump: 5, physicalContact: 9, balance: 4, stamina: 14, defensiveProwess: 7, ballWinning: 3, aggression: 1, weakFootAccuracy: 23 },
    CMF: { attackingProwess: 5, ballControl: 23, dribbling: 16, tightPossession: 8, lowPass: 23, loftedPass: 21, speed: 4, acceleration: 6, physicalContact: 3, balance: 2, stamina: 17, defensiveProwess: 3, weakFootAccuracy: 23 },
    LMF: { attackingProwess: 7, ballControl: 15, dribbling: 17, tightPossession: 8, lowPass: 7, loftedPass: 12, curl: 4, speed: 24, acceleration: 21, stamina: 13, weakFootAccuracy: 56 },
    RMF: { attackingProwess: 7, ballControl: 15, dribbling: 17, tightPossession: 8, lowPass: 7, loftedPass: 12, curl: 4, speed: 24, acceleration: 21, stamina: 13, weakFootAccuracy: 56 },
    AMF: { attackingProwess: 14, ballControl: 23, dribbling: 17, tightPossession: 7, lowPass: 21, loftedPass: 14, finishing: 17, speed: 5, acceleration: 7, physicalContact: 2, balance: 3, stamina: 3, weakFootAccuracy: 37 },
    LWF: { attackingProwess: 17, ballControl: 19, dribbling: 15, tightPossession: 7, lowPass: 5, loftedPass: 9, finishing: 11, speed: 15, acceleration: 15, kickingPower: 5, physicalContact: 2, balance: 4, stamina: 6, weakFootAccuracy: 47 },
    RWF: { attackingProwess: 17, ballControl: 19, dribbling: 15, tightPossession: 7, lowPass: 5, loftedPass: 9, finishing: 11, speed: 15, acceleration: 15, kickingPower: 5, physicalContact: 2, balance: 4, stamina: 6, weakFootAccuracy: 47 },
    SS: { attackingProwess: 15, ballControl: 19, dribbling: 13, tightPossession: 6, lowPass: 9, loftedPass: 9, finishing: 14, speed: 9, acceleration: 21, kickingPower: 6, physicalContact: 2, balance: 5, stamina: 4, weakFootAccuracy: 37 },
    CF: { attackingProwess: 31, ballControl: 23, dribbling: 9, tightPossession: 5, finishing: 36, headingAbility: 3, speed: 5, acceleration: 5, kickingPower: 3, jump: 3, physicalContact: 8, balance: 2, weakFootAccuracy: 38 }
  };

  const OVERALL_POSITION_ADJUSTMENT = {
    GK: 8, CB: 8, LB: 9, RB: 9, DMF: 9, CMF: 8,
    LMF: 8, RMF: 8, AMF: 8, LWF: 10, RWF: 10, SS: 9, CF: 8
  };
  const OVERALL_FAMILIARITY_BONUS = {
    GK: { A: 5, B: 3 }, CB: { A: 5, B: 3 }, LB: { A: 4, B: 2 },
    RB: { A: 4, B: 2 }, DMF: { A: 4, B: 2 }, CMF: { A: 5, B: 3 },
    LMF: { A: 5, B: 3 }, RMF: { A: 5, B: 3 }, AMF: { A: 5, B: 3 },
    LWF: { A: 4, B: 2 }, RWF: { A: 4, B: 2 }, SS: { A: 5, B: 3 }, CF: { A: 5, B: 3 }
  };

  function calculatePositionScore(player, position) {
    const weights = OVERALL_POSITION_WEIGHTS[position];
    if (!weights) return null;
    let score = 0;
    for (const field of OVERALL_ATTRIBUTES) {
      const value = Number(player[field]);
      if (!Number.isFinite(value)) return null;
      score += (field === "weakFootAccuracy" ? value - 1 : value - 25) * (weights[field] || 0);
    }
    const gkAwareness = Number(player.gkAwareness);
    const gkReach = Number(player.gkReach);
    const gkCatching = Number(player.gkCatching);
    const gkClearing = Number(player.gkClearing);
    const gkReflexes = Number(player.gkReflexes);
    if (![gkAwareness, gkReach, gkCatching, gkClearing, gkReflexes].every(Number.isFinite)) return null;
    score += (Math.trunc((gkAwareness + gkReach) / 2) - 25) * (weights.gkAwareness || 0);
    score += (Math.trunc((gkCatching + gkClearing + gkReflexes) / 3) - 25) * (weights.gkReflexes || 0);
    return Math.trunc((score + 50) / 100);
  }

  function calculateGeneralScore(player) {
    let total = 0;
    for (const field of OVERALL_ATTRIBUTES) {
      if (field === "weakFootAccuracy") continue;
      const value = Number(player[field]);
      if (!Number.isFinite(value)) return null;
      total += value;
    }
    const gkAwareness = Number(player.gkAwareness);
    const gkReach = Number(player.gkReach);
    const gkCatching = Number(player.gkCatching);
    const gkClearing = Number(player.gkClearing);
    const gkReflexes = Number(player.gkReflexes);
    if (![gkAwareness, gkReach, gkCatching, gkClearing, gkReflexes].every(Number.isFinite)) return null;
    total += Math.trunc((gkAwareness + gkReach) / 2);
    total += Math.trunc((gkCatching + gkClearing + gkReflexes) / 3);
    return Math.trunc((Math.trunc(total * 100 / 22) + 50) / 100);
  }

  function transformGeneralScore(value) {
    if (value <= 61) return value - 9;
    if (value <= 62) return value - 6;
    if (value <= 63) return value - 4;
    if (value <= 64) return value - 2;
    if (value <= 65) return value;
    if (value <= 66) return value + 1;
    if (value <= 67) return value + 3;
        if (value <= 68) return value + 5;
    if (value <= 69) return value + 6;
    if (value <= 70) return value + 7;
    if (value <= 71) return value + 8;
    if (value <= 73) return value + 10;
    if (value <= 75) return value + 12;
    if (value <= 77) return value + 13;
    return value + 14;
  }

  function calculateOverall(player, targetPosition = player.registeredPosition) {
    const positional = calculatePositionScore(player, targetPosition);
    if (positional === null) return null;
    const clampMin = value => Math.max(value, 40);
    if (player.registeredPosition !== targetPosition) {
      const familiarityField = ({ GK: "positionGk", CB: "positionCb", LB: "positionLb", RB: "positionRb", DMF: "positionDmf", CMF: "positionCmf", LMF: "positionLmf", RMF: "positionRmf", AMF: "positionAmf", LWF: "positionLwf", RWF: "positionRwf", SS: "positionSs", CF: "positionCf" })[targetPosition];
      const familiarity = familiarityField ? player[familiarityField] : "C";
      const bonus = OVERALL_FAMILIARITY_BONUS[targetPosition]?.[familiarity];
      if (bonus !== undefined) return clampMin(positional + bonus);
    }
    const adjusted = positional + (OVERALL_POSITION_ADJUSTMENT[targetPosition] || 0);
    if (targetPosition === "GK") return clampMin(adjusted);
    const general = calculateGeneralScore(player);
    if (general === null) return null;
    const transformed = transformGeneralScore(general);
    return clampMin(Math.trunc((adjusted * 60 + transformed * 40 + 50) / 100));
  }
  // End of isolated Overall calculation section.

  let reputationBands = [];
  let pendingPlan = null;

  function invalidatePlan() {
    pendingPlan = null;
    $("#pbe-apply").disabled = true;
  }

  function updateLanguage() {
    $("#pbe-title").textContent = t("title");
    $("#pbe-close").textContent = t("close");
    $("#pbe-language-label").textContent = t("language");
    $("#pbe-intro").textContent = t("intro");
    $("#pbe-save-config").textContent = t("saveConfig");
    $("#pbe-load-config").textContent = t("loadConfig");
    $("#pbe-targets-title").textContent = t("targetsTitle");
    $("#pbe-all-label").textContent = t("allPositions");
    $("#pbe-attributes-title").textContent = t("attributesTitle");
    $("#pbe-add-attribute").textContent = t("addAttribute");
    $("#pbe-attributes-help").textContent = t("attributesHelp");
    $("#pbe-reputation-title").textContent = t("reputationTitle");
    $("#pbe-reputation-enabled-label").textContent = t("reputationEnabled");
    $("#pbe-configure-reputation").textContent = t("configureReputation");
    updateReputationSummary();
    $("#pbe-skills-title").textContent = t("skillsTitle");
    $("#pbe-skill-search").placeholder = t("skillSearch");
    $("#pbe-select-visible").textContent = t("selectVisible");
    $("#pbe-clear-skills").textContent = t("clearSkills");
    $("#pbe-skills-help").textContent = t("skillsHelp");
    $("#pbe-preview").textContent = t("preview");
    $("#pbe-apply").textContent = t("apply");

    const rows = [...root.querySelectorAll(".pbe-attribute-row")].map(row => ({
      field: row.querySelector(".pbe-attr-field").value,
      delta: row.querySelector(".pbe-attr-delta").value
    }));
    $("#pbe-attribute-rows").innerHTML = "";
    rows.forEach(row => addAttributeRow(row.field, row.delta));

    renderSkills();
    refreshTargetCount();
    invalidatePlan();
    $("#pbe-preview-results").innerHTML = "";
    status(t("ready"));
  }

  function updateReputationSummary() {
    const el = $("#pbe-reputation-summary");
    if (el) el.textContent = reputationBands.length ? t("reputationBandsSummary")(reputationBands.length) : t("reputationNotConfigured");
  }

  function validateReputationBands(bands) {
    if (!Array.isArray(bands) || bands.length < 1 || bands.length > 8) return false;
    let expectedOverall = 40;
    let expectedRep = 1;
    for (const band of bands) {
      const os = Number(band.overallStart), oe = Number(band.overallEnd);
      const rs = Number(band.reputationStart), re = Number(band.reputationEnd);
      if (![os, oe, rs, re].every(Number.isInteger)) return false;
      if (os !== expectedOverall || oe < os || oe > 100) return false;
      if (rs !== expectedRep || re < rs || re > 8) return false;
      const overallCount = oe - os + 1;
      const reputationCount = re - rs + 1;
      if (overallCount < reputationCount) return false;
      expectedOverall = oe + 1;
      expectedRep = re + 1;
    }
    return expectedOverall === 101;
  }

  function getReputationForOverall(overall, bands) {
    const band = bands.find(item => overall >= item.overallStart && overall <= item.overallEnd);
    if (!band) return null;
    const overallCount = band.overallEnd - band.overallStart + 1;
    const reputationCount = band.reputationEnd - band.reputationStart + 1;
    return band.reputationStart + Math.floor((overall - band.overallStart) * reputationCount / overallCount);
  }

  function openReputationModal() {
    const overlay = document.createElement("div");
    overlay.id = "pbe-reputation-modal";
    overlay.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:#0008;display:flex;align-items:center;justify-content:center;padding:16px;font:13px/1.4 Arial,sans-serif";
    const modal = document.createElement("div");
    modal.style.cssText = "background:#fff;color:#222;border:2px solid #333;border-radius:10px;padding:16px;width:760px;max-width:100%;max-height:90vh;overflow:auto;box-shadow:0 8px 30px #0007";
    modal.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><strong id="pbe-rep-modal-title" style="font-size:16px"></strong><button type="button" id="pbe-rep-modal-close">×</button></div>
      <p id="pbe-rep-modal-help" style="color:#555"></p>
      <div id="pbe-rep-bands"></div>
      <div id="pbe-rep-error" role="alert" style="color:#b00020;margin:8px 0"></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button type="button" id="pbe-rep-add"></button><span style="flex:1"></span><button type="button" id="pbe-rep-cancel"></button><button type="button" id="pbe-rep-save" style="font-weight:bold"></button></div>`;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    const q = selector => modal.querySelector(selector);
    q("#pbe-rep-modal-title").textContent = t("reputationModalTitle");
    q("#pbe-rep-modal-help").textContent = t("reputationModalHelp");
    q("#pbe-rep-add").textContent = t("addReputationBand");
    q("#pbe-rep-cancel").textContent = t("cancel");
    q("#pbe-rep-save").textContent = t("saveReputationBands");

    let draft = reputationBands.map(b => ({ ...b }));
    const render = () => {
      q("#pbe-rep-bands").innerHTML = draft.map((b, i) => `
        <fieldset data-band="${i}" style="margin:8px 0;padding:8px;border:1px solid #ccc;border-radius:6px">
          <legend><b>${i + 1}</b></legend>
          <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px">
            <label style="display:block">${t("overallFrom")}<input data-key="overallStart" type="number" min="40" max="100" value="${b.overallStart ?? ""}" style="box-sizing:border-box;width:100%;padding:5px"></label>
            <label style="display:block">${t("overallTo")}<input data-key="overallEnd" type="number" min="40" max="100" value="${b.overallEnd ?? ""}" style="box-sizing:border-box;width:100%;padding:5px"></label>
            <label style="display:block">${t("reputationFrom")}<input data-key="reputationStart" type="number" min="1" max="8" value="${b.reputationStart ?? ""}" style="box-sizing:border-box;width:100%;padding:5px"></label>
            <label style="display:block">${t("reputationTo")}<input data-key="reputationEnd" type="number" min="1" max="8" value="${b.reputationEnd ?? ""}" style="box-sizing:border-box;width:100%;padding:5px"></label>
          </div>
          <button type="button" data-remove="${i}" style="margin-top:8px">${t("removeBand")}</button>
        </fieldset>`).join("") || `<p style="color:#805500">${t("reputationNotConfigured")}</p>`;
      q("#pbe-rep-add").disabled = draft.length >= 8;
      q("#pbe-rep-bands").querySelectorAll("fieldset").forEach(fieldset => {
        fieldset.querySelectorAll("input").forEach(input => input.addEventListener("input", () => {
          const index = Number(fieldset.dataset.band);
          draft[index][input.dataset.key] = input.value === "" ? "" : Number(input.value);
          q("#pbe-rep-error").textContent = "";
        }));
      });
      q("#pbe-rep-bands").querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => {
        draft.splice(Number(button.dataset.remove), 1); render();
      }));
    };
    render();
    const close = () => overlay.remove();
    q("#pbe-rep-modal-close").addEventListener("click", close);
    q("#pbe-rep-cancel").addEventListener("click", close);
    q("#pbe-rep-add").addEventListener("click", () => {
      if (draft.length >= 8) return;
      draft.push({ overallStart: "", overallEnd: "", reputationStart: "", reputationEnd: "" });
      render();
    });
    q("#pbe-rep-save").addEventListener("click", () => {
      const normalized = draft.map(b => ({
        overallStart: Number(b.overallStart), overallEnd: Number(b.overallEnd),
        reputationStart: Number(b.reputationStart), reputationEnd: Number(b.reputationEnd)
      }));
      if (!validateReputationBands(normalized)) {
        q("#pbe-rep-error").textContent = t("reputationValidation");
        return;
      }
      reputationBands = normalized;
      updateReputationSummary();
      invalidatePlan();
      $("#pbe-preview-results").innerHTML = "";
      close();
      status(t("ready"));
    });
  }

  function exportConfiguration() {
    saveVisibleSkillState();

    const config = {
      format: "pes-gv-bulk-tools-config",
      version: 1,
      language: lang,
      targets: {
        allPositions: $("#pbe-all").checked,
        positions: [...root.querySelectorAll(".pbe-pos:checked")].map(el => el.value)
      },
      attributes: [...root.querySelectorAll(".pbe-attribute-row")].map(row => ({
        field: row.querySelector(".pbe-attr-field").value,
        delta: row.querySelector(".pbe-attr-delta").value
      })),
      reputation: {
        enabled: $("#pbe-reputation-enabled").checked,
        bands: reputationBands.map(b => ({ ...b }))
      },
      specialSkills: Object.fromEntries(
        [...skillState.entries()].map(([key, state]) => [key, {
          checked: Boolean(state.checked),
          action: state.action === "false" ? "false" : "true"
        }])
      )
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pes-gv-config.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    status(t("configSaved"), "#175c2b");
  }

  function validateConfiguration(config) {
    if (!config || typeof config !== "object" ||
        config.format !== "pes-gv-bulk-tools-config" || config.version !== 1 ||
        !["pt-BR", "en"].includes(config.language) ||
        !config.targets || typeof config.targets.allPositions !== "boolean" ||
        !Array.isArray(config.targets.positions) ||
        !Array.isArray(config.attributes) ||
        !config.specialSkills || typeof config.specialSkills !== "object") {
      throw new Error("Invalid configuration structure");
    }

    if (!config.targets.positions.every(position => positions.includes(position))) {
      throw new Error("Invalid position filter");
    }

    const normalizedAttributes = config.attributes.map(item => {
      if (!item || typeof item !== "object" ||
          !Object.prototype.hasOwnProperty.call(attributes, item.field) ||
          item.delta === undefined || item.delta === null ||
          !Number.isFinite(Number(item.delta))) {
        throw new Error("Invalid attribute rule");
      }
      return { field: item.field, delta: String(item.delta) };
    });

    const normalizedSkills = {};
    for (const key of Object.keys(skills)) {
      const item = config.specialSkills[key];
      if (item === undefined) {
        normalizedSkills[key] = { checked: false, action: "true" };
        continue;
      }
      if (!item || typeof item !== "object" || typeof item.checked !== "boolean" ||
          !["true", "false"].includes(item.action)) {
        throw new Error("Invalid special skill setting");
      }
      normalizedSkills[key] = { checked: item.checked, action: item.action };
    }

    const reputationConfig = config.reputation === undefined
      ? { enabled: false, bands: [] }
      : config.reputation;
    if (!reputationConfig || typeof reputationConfig !== "object" ||
        typeof reputationConfig.enabled !== "boolean" || !Array.isArray(reputationConfig.bands) ||
        (reputationConfig.bands.length > 0 && !validateReputationBands(reputationConfig.bands))) {
      throw new Error("Invalid reputation configuration");
    }
    if (reputationConfig.enabled && !validateReputationBands(reputationConfig.bands)) {
      throw new Error("Enabled reputation configuration requires valid bands");
    }
    const normalizedReputation = {
      enabled: reputationConfig.enabled,
      bands: reputationConfig.bands.map(b => ({
        overallStart: Number(b.overallStart), overallEnd: Number(b.overallEnd),
        reputationStart: Number(b.reputationStart), reputationEnd: Number(b.reputationEnd)
      }))
    };

    return {
            language: config.language,
      targets: {
        allPositions: config.targets.allPositions,
        positions: [...new Set(config.targets.positions)]
      },
      attributes: normalizedAttributes,
      specialSkills: normalizedSkills,
      reputation: normalizedReputation
    };
  }

  function importConfiguration(config) {
    // Update language first, while the existing skill state is still intact.
    lang = config.language;
    $("#pbe-language").value = lang;
    updateLanguage();

    $("#pbe-all").checked = config.targets.allPositions;
    root.querySelectorAll(".pbe-pos").forEach(el => {
      el.checked = config.targets.positions.includes(el.value) && !config.targets.allPositions;
      el.disabled = config.targets.allPositions;
    });

    $("#pbe-attribute-rows").innerHTML = "";
    config.attributes.forEach(rule => addAttributeRow(rule.field, rule.delta));

    reputationBands = (config.reputation?.bands || []).map(b => ({ ...b }));
    $("#pbe-reputation-enabled").checked = Boolean(config.reputation?.enabled);
    updateReputationSummary();

    for (const key of Object.keys(skills)) {
      skillState.set(key, config.specialSkills[key] || { checked: false, action: "true" });
    }
    $("#pbe-skill-search").value = "";
    renderSkills("", false);

    invalidatePlan();
    $("#pbe-preview-results").innerHTML = "";
    refreshTargetCount();
    status(t("configLoaded"), "#175c2b");
  }

  $("#pbe-save-config").addEventListener("click", () => {
    try {
      exportConfiguration();
    } catch (e) {
      status(`Error exporting configuration: ${e.message || e}`, "#b00020");
    }
  });

  $("#pbe-load-config").addEventListener("click", () => {
    $("#pbe-config-file").click();
  });

  $("#pbe-config-file").addEventListener("change", async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const validated = validateConfiguration(parsed);
      importConfiguration(validated);
    } catch (e) {
      status(t("configInvalid"), "#b00020");
      console.error("PES GV Bulk Tools configuration import failed:", e);
    } finally {
      event.target.value = "";
    }
  });

  $("#pbe-close").addEventListener("click", () => root.remove());

  $("#pbe-language").addEventListener("change", event => {
    lang = event.target.value;
    updateLanguage();
  });

  $("#pbe-configure-reputation").addEventListener("click", openReputationModal);
  $("#pbe-reputation-enabled").addEventListener("change", () => {
    invalidatePlan();
    $("#pbe-preview-results").innerHTML = "";
  });

  $("#pbe-all").addEventListener("change", () => {
    root.querySelectorAll(".pbe-pos").forEach(el => {
      el.disabled = $("#pbe-all").checked;
      if ($("#pbe-all").checked) el.checked = false;
    });
    invalidatePlan();
    refreshTargetCount();
  });

  root.querySelectorAll(".pbe-pos").forEach(el => el.addEventListener("change", () => {
    invalidatePlan();
    refreshTargetCount();
  }));

  $("#pbe-add-attribute").addEventListener("click", () => {
    addAttributeRow();
    invalidatePlan();
  });

  $("#pbe-skill-search").addEventListener("input", event => renderSkills(event.target.value));

  $("#pbe-select-visible").addEventListener("click", () => {
    root.querySelectorAll(".pbe-skill-row").forEach(row => {
      row.querySelector(".pbe-skill-check").checked = true;
    });
    saveVisibleSkillState();
    invalidatePlan();
  });

  $("#pbe-clear-skills").addEventListener("click", () => {
    skillState.forEach((state, key) => {
      skillState.set(key, {
        ...state,
        checked: false
      });
    });
    renderSkills(undefined, false);
    invalidatePlan();
  });

  function buildPlan() {
    saveVisibleSkillState();
    const targets = getTargets();
    if (!targets.length) throw new Error(t("noValidPlayers"));

    const numericRules = [...root.querySelectorAll(".pbe-attribute-row")]
      .map(row => ({
        field: row.querySelector(".pbe-attr-field").value,
        delta: Number(row.querySelector(".pbe-attr-delta").value)
      }))
      .filter(rule => Number.isFinite(rule.delta) && rule.delta !== 0);

    const skillRules = [...skillState.entries()]
      .filter(([, state]) => state.checked)
      .map(([field, state]) => ({ field, value: state.action === "true" }));

    const reputationEnabled = $("#pbe-reputation-enabled").checked;
    if (reputationEnabled && !validateReputationBands(reputationBands)) {
      throw new Error(t("reputationValidation"));
    }

    const plan = [];
    const preview = [];

    for (const { player, index } of targets) {
      // Reputation uses the post-edit numerical attributes when attribute rules
      // and reputation are enabled together in the same operation.
      const playerAfterNumericChanges = { ...player };
      for (const rule of numericRules) {
        const [min, max] = attributes[rule.field].slice(2);
        const oldValue = Number(player[rule.field]);
        if (!Number.isFinite(oldValue)) continue;

        const newValue = Math.max(min, Math.min(max, oldValue + rule.delta));
        playerAfterNumericChanges[rule.field] = newValue;
        if (newValue === oldValue) continue;

        plan.push([`players.${index}.${rule.field}`, newValue]);
        preview.push({
          player: player.playerName,
          position: player.registeredPosition,
          field: attrLabel(rule.field),
          before: oldValue,
          after: newValue
        });
      }

      for (const rule of skillRules) {
        const oldValue = Boolean(player[rule.field]);
        if (oldValue === rule.value) continue;

        plan.push([`players.${index}.${rule.field}`, rule.value]);
        preview.push({
          player: player.playerName,
          position: player.registeredPosition,
          field: skillLabel(rule.field),
          before: oldValue ? t("checked") : t("unchecked"),
          after: rule.value ? t("checked") : t("unchecked")
        });
      }

      if (reputationEnabled) {
        const overall = calculateOverall(playerAfterNumericChanges);
        if (overall === null) {
          throw new Error(`Could not calculate Overall for ${player.playerName || `player #${index}`}. Check the player's attribute values.`);
        }
        const newReputation = getReputationForOverall(overall, reputationBands);
        if (newReputation === null) {
          throw new Error(`No reputation band covers Overall ${overall} for ${player.playerName || `player #${index}`}.`);
        }
        const oldReputation = Number(player.reputation);
        if (oldReputation !== newReputation) {
          plan.push([`players.${index}.reputation`, newReputation]);
          preview.push({
            player: player.playerName,
            position: player.registeredPosition,
            field: `${t("reputationField")} (Overall ${overall})`,
            before: Number.isFinite(oldReputation) ? oldReputation : String(player.reputation ?? "—"),
            after: newReputation
          });
        }
      }
    }

    return { targets, plan, preview };
  }

  $("#pbe-preview").addEventListener("click", () => {
    try {
      pendingPlan = buildPlan();
      const { targets, plan, preview } = pendingPlan;
      $("#pbe-apply").disabled = plan.length === 0;

      if (!plan.length) {
        $("#pbe-preview-results").innerHTML = "";
        status(t("noChanges")(targets.length), "#805500");
        return;
      }

      const shown = preview.slice(0, 150);
      const headers = ["player", "position", "field", "before", "after"];
      $("#pbe-preview-results").innerHTML = `
        <p><b>${t("previewTitle")}:</b> ${t("previewSummary")(plan.length, targets.length)}</p>
        ${preview.length > 150 ? `<p>${t("showingFirst")(preview.length)}</p>` : ""}
        <div style="max-height:260px;overflow:auto">
          <table style="border-collapse:collapse;width:100%;font-size:12px">
            <thead><tr>
              ${headers.map(key => `<th style="text-align:left;border-bottom:1px solid #aaa;padding:4px">${t(key)}</th>`).join("")}
            </tr></thead>
            <tbody>${shown.map(item => `<tr>
              ${[item.player, item.position, item.field, item.before, item.after].map(value =>
                `<td style="border-bottom:1px solid #eee;padding:4px">${String(value)}</td>`
              ).join("")}
            </tr>`).join("")}</tbody>
          </table>
        </div>`;
      status(t("previewNotApplied"), "#175c2b");
    } catch (e) {
      pendingPlan = null;
      $("#pbe-apply").disabled = true;
      status(e.message || String(e), "#b00020");
    }
  });

  $("#pbe-apply").addEventListener("click", () => {
    if (!pendingPlan?.plan?.length) return;

    const { plan, targets } = pendingPlan;
    if (!confirm(t("confirm")(plan.length, targets.length))) return;

    try {
      store.dispatch({
        type: "pes2020Data/changeMultipleData",
        payload: plan
      });

      const playersAfter = getPlayers();
      const verified = plan.every(([path, expected]) => {
        const parts = path.split(".");
        const field = parts.pop();
        const index = Number(parts.pop());
        const actual = playersAfter[index]?.[field];
        return actual === expected || Number(actual) === expected;
      });

      pendingPlan = null;
      $("#pbe-apply").disabled = true;
      $("#pbe-preview-results").innerHTML = "";
      status(
        verified ? t("applied")(plan.length) : t("verifyFailed"),
        verified ? "#175c2b" : "#b00020"
      );
      refreshTargetCount();
    } catch (e) {
      status(t("applyError")(e.message || e), "#b00020");
    }
  });

  addAttributeRow("finishing", 0);
  updateLanguage();
  refreshTargetCount();
})();