const questions = [
    { q: 'Qual o primeiro nome da sua mãe?', a: 'edina' },
    { q: 'Qual o primeiro nome do seu pai?', a: 'flávio' },
    { q: 'Qual o primeiro nome do seu irmão?', a: 'paulo' },
    { q: 'Qual o nome da cidade em que nasceu?', a: 'guarujá' },
    { q: 'Quantos anos você faz hoje?', a: ['16', '16 anos'] },
    { q: 'Onde você estuda (nome completo)?', 
      a: [
        'escola estadual professor diniz martins', 
        'escola estadual prof° diniz martins', 
        'e.e. professor diniz martins',
        'professor diniz martins',
        'e.e. prof° diniz martins'
      ] 
    },
    { q: 'Qual o seu celular?', a: ['iphone 14', 'iphone14'] },
  ];
  
  let current = 0;
  const questionEl = document.getElementById("question");
  const answerEl = document.getElementById("answer");
  const box = document.getElementById("question-box");
  const main = document.getElementById("main-content");
  const music = document.getElementById("bg-music");
  
  function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
  
  function askNextQuestion() {
    if (current < questions.length) {
      questionEl.textContent = questions[current].q;
      answerEl.value = '';
      answerEl.focus();
    } else {
      box.classList.add("hidden");
      main.classList.remove("hidden");
      explodeConfetti();
  
      mostrarFotosComMusica(() => {
        document.getElementById("mensagem-final").classList.remove("hidden");
        document.getElementById("extra-line").textContent = "Vê se não chora de saudades kkkkk";
        document.querySelector(".final-btn").classList.remove("hidden");
        document.getElementById("joke").classList.remove("hidden");
      });
    }
  }
  
  answerEl.addEventListener("keypress", function(e) {
    if (music.paused) music.play();
    if (e.key === "Enter") {
      if (music.paused) music.play();
      const ans = normalize(answerEl.value.trim());
      const correct = questions[current].a;
      const isCorrect = Array.isArray(correct)
        ? correct.map(normalize).includes(ans)
        : normalize(correct) === ans;
  
      if (isCorrect) {
        current++;
        askNextQuestion();
      } else {
        alert("Errou! Tenta de novo 😂");
      }
    }
  });
  
  function explodeConfetti() {
    const container = document.getElementById("confetti-container");
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti-piece");
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-10px";
      confetti.style.setProperty('--hue', Math.floor(Math.random() * 360));
      container.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }
  
  function mostrarFotosComMusica(callback) {
    const gif = document.querySelector(".gif-dance");
    gif.classList.add("hidden"); 
  
    const container = document.createElement("div");
    container.id = "slideshow-container";
    container.style.position = "relative";
    container.style.height = "100vh";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.backgroundColor = "#000";
    container.style.zIndex = "9999";
    container.style.padding = "20px";
    container.style.textAlign = "center";
    main.appendChild(container);
  
    const mensagens = [
      "Feliz aniversário!",
      "Mais um ano perto dos 40  kkkk.",
      "Aproveite enaquanto nao virá adulta.",
      "Parabéns pela nova idade.",
      "Que venham novos desafios.",
      "Comemore do seu jeito.",
      "Data importante, lembre-se disso.",
      "Hoje o destaque é seu e do bolo.",
      "mais um ano perto da vida adulta",
      "Parabéns."
    ];
  
    const total = 23;
    let index = 1;
  
    const images = Array.from({ length: 24 }, (_, i) => `imagens/foto${i + 1}.jpg`);
  
    const msg = document.createElement("div");
    msg.style.fontSize = "1.5em";
    msg.style.margin = "20px 0";
    msg.style.color = "#ffffff";
    msg.style.fontWeight = "bold";
    msg.style.textShadow = "0 0 10px #00ffff";
    container.appendChild(msg);
  
    const img = document.createElement("img");
    img.style.maxWidth = "100%";  
    img.style.maxHeight = "90vh";  
    img.style.borderRadius = "16px";
    img.style.boxShadow = "0 0 40px #00ffff";
    img.style.transition = "opacity 1s ease-in-out";
    img.style.opacity = "0";
    container.appendChild(img);
  
    function mostrarProximaImagem() {
      if (index > total) {
        container.remove();
        gif.classList.remove("hidden"); 
        callback();
        return;
      }
  
      img.src = images[index - 1];
      msg.textContent = mensagens[Math.floor(Math.random() * mensagens.length)];
      img.style.opacity = "0";
  
      setTimeout(() => { img.style.opacity = "1"; }, 100);
      setTimeout(() => {
        img.style.opacity = "0";
        index++;
        setTimeout(mostrarProximaImagem, 1000);
      }, 2500);
    }
  
    mostrarProximaImagem();
  }
  
  
  function showFinalJoke() {
    const emoji = ["😂", "🤡", "☕", "📄", "📉"];
    for (let i = 0; i < 50; i++) {
      const e = document.createElement("div");
      e.classList.add("emoji-burst");
      e.innerText = emoji[Math.floor(Math.random() * emoji.length)];
      e.style.left = Math.random() * 100 + "vw";
      e.style.top = Math.random() * 100 + "vh";
      document.body.appendChild(e);
      setTimeout(() => e.remove(), 2000);
    }
  }
  
  askNextQuestion();
  