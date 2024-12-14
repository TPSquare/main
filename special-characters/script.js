await import("https://tpsquare.github.io/modules/js/tpsm/main.js");
await TPSM.import('doc');

new (class Run {
  constructor() {
    this.getElement();
    this.createData();
    this.render();
    this.setupSearchInput();
  }
  createData() {
    this.data = [
      ["♥", "solid heart"],
      ["♡", "hollow heart"],
      ["⁰", "0 superscript zero"],
      ["¹", "1 superscript one"],
      ["²", "2 superscript two"],
      ["³", "3 superscript three"],
      ["⁴", "4 superscript four"],
      ["⁵", "5 superscript five"],
      ["⁶", "6 superscript six"],
      ["⁷", "7 superscript seven"],
      ["⁸", "8 superscript eight"],
      ["⁹", "9 superscript nine"],
      ["₀", "0 subscript zero"],
      ["₁", "1 subscript one"],
      ["₂", "2 subscript two"],
      ["₃", "3 subscript three"],
      ["₄", "4 subscript four"],
      ["₅", "5 subscript five"],
      ["₆", "6 subscript six"],
      ["₇", "7 subscript seven"],
      ["₈", "8 subscript eight"],
      ["₉", "9 subscript nine"],
      ["α", "alpha"],
      ["β", "beta"],
      ["γ", "gamma"],
      ["δ", "delta"],
      ["ε", "epsilon"],
      ["ζ", "zeta"],
      ["η", "eta"],
      ["θ", "theta"],
      ["ι", "iota"],
      ["κ", "kappa"],
      ["λ", "lambda"],
      ["μ", "mu micro"],
      ["ν", "nu"],
      ["ξ", "xi"],
      ["ο", "omicron"],
      ["π", "pi"],
      ["ρ", "rho"],
      ["σ", "sigma"],
      ["ς", "final sigma"],
      ["τ", "tau"],
      ["υ", "upsilon"],
      ["φ", "phi"],
      ["χ", "chi"],
      ["ψ", "psi"],
      ["ω", "omega"],
      ["√", "square root"],
      ["∞", "infinity"],
      ["°", "degree"],
      ["Δ", "delta"],
      ["×", "x multiplication sign"],
      ["÷", "/ : division sign"],
      ["✓", "check mark tick"],
      ["✗", "cross mark x mark"],
      ["Ω", "omega"],
      ["•", "bullet point dot"],
      ["⁻", "minus hyphen negative exponent"],
      ["⁺", "plus positive exponent"],
    ].map((e) => ({ char: e[0], keys: e[1] }));
  }
  getElement() {
    document.body.main = document.body.querySelector("main");
  }
  render() {
    this.data.forEach((data) =>
      document.body.main.appendChild(
        TPSM.doc.createElement({
          tag: "div",
          innerHTML: data.char,
          title: data.keys,
          data,
          onclick() {
            try {
              if (this.jc) return;
              window.navigator.clipboard.write([
                new ClipboardItem({
                  "text/plain": new Blob([this.data.char], {
                    type: "text/plain",
                  }),
                }),
              ]);
              this.justCopied(true);
              setTimeout(() => this.justCopied(false), 1000);
            } catch (error) {
              alert(
                "Sorry, this feature is currently unavailable on your device!"
              );
            }
          },
          justCopied(ok) {
            if (ok && !this.jc) {
              this.jc = true;
              this.classList.add("just-copied");
            } else if (!ok && this.jc) {
              this.jc = false;
              this.classList.remove("just-copied");
            }
          },
        })
      )
    );
  }
  setupSearchInput() {
    document.querySelector("#search-box input").oninput = (e) => {
      const value = e.target.value.toLowerCase().trim().split(" ");
      Array.from(document.body.main.children).forEach((e) => {
        let i;
        for (i = 0; i < value.length; i++) {
          if (e.data.keys.includes(value[i])) {
            e.classList.remove("hidden");
            break;
          }
        }
        if (i == value.length) e.classList.add("hidden");
      });
    };
  }
})();
