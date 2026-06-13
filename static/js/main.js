(function () {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const copyBtn = document.getElementById('copy-btn');
  const bibtex = document.getElementById('bibtex');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (copyBtn && bibtex) {
    copyBtn.addEventListener('click', async function () {
      const text = bibtex.textContent.trim();
      const copyText = copyBtn.querySelector('.copy-text');
      const copyDone = copyBtn.querySelector('.copy-done');

      try {
        await navigator.clipboard.writeText(text);
        copyText.hidden = true;
        copyDone.hidden = false;
        setTimeout(function () {
          copyText.hidden = false;
          copyDone.hidden = true;
        }, 2000);
      } catch (err) {
        const range = document.createRange();
        range.selectNodeContents(bibtex);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
  }
})();
