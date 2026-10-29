(() => {
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

  const positions = [
    "GK", "RB", "CB", "LB", "DMF", "CMF",
    "AMF", "RMF", "LMF", "RWF", "LWF", "SS", "CF"
  ];

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
      <div>
        <strong id="pbe-title" style="font-size:17px"></strong>
        <div id="pbe-version" style="font-size:11px;color:#777;margin-top:2px">
          v1.1.0
        </div>
      </div>
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

    return {
      language: config.language,
      targets: {
        allPositions: config.targets.allPositions,
        positions: [...new Set(config.targets.positions)]
      },
      attributes: normalizedAttributes,
      specialSkills: normalizedSkills
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

    const plan = [];
    const preview = [];

    for (const { player, index } of targets) {
      for (const rule of numericRules) {
        const [min, max] = attributes[rule.field].slice(2);
        const oldValue = Number(player[rule.field]);
        if (!Number.isFinite(oldValue)) continue;

        const newValue = Math.max(min, Math.min(max, oldValue + rule.delta));
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