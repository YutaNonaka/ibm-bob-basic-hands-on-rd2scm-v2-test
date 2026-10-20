(function () {
  'use strict';

  var state = {
    category: 'all',
    query: '',
    open: {} // 開いている項目idの集合
  };

  var els = {
    input: document.getElementById('search-input'),
    clear: document.getElementById('search-clear'),
    tabs: document.getElementById('category-tabs'),
    count: document.getElementById('result-count'),
    list: document.getElementById('faq-list'),
    empty: document.getElementById('empty-state')
  };

  function normalize(text) {
    return String(text).normalize('NFKC').toLowerCase().trim();
  }

  // 簡易記法(**太字**、`コード`)をDOM要素に変換して親に追加する(innerHTMLは使わない)
  function appendInline(parent, text) {
    var pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
    var parts = text.split(pattern);
    parts.forEach(function (part) {
      if (!part) return;
      if (part.slice(0, 2) === '**' && part.slice(-2) === '**') {
        var strong = document.createElement('strong');
        strong.textContent = part.slice(2, -2);
        parent.appendChild(strong);
      } else if (part.charAt(0) === '`' && part.charAt(part.length - 1) === '`') {
        var code = document.createElement('code');
        code.textContent = part.slice(1, -1);
        parent.appendChild(code);
      } else {
        parent.appendChild(document.createTextNode(part));
      }
    });
  }

  // 回答ブロックのプレーンテキスト(検索用)
  function answerToPlainText(blocks) {
    return blocks.map(function (block) {
      var raw = block.type === 'ul' ? block.items.join(' ') : block.text;
      return raw.replace(/\*\*|`/g, '');
    }).join(' ');
  }

  function matches(item) {
    if (state.category !== 'all' && item.category !== state.category) return false;
    if (!state.query) return true;
    var haystack = normalize(item.question + ' ' + answerToPlainText(item.answer));
    return haystack.indexOf(state.query) !== -1;
  }

  function buildItem(item) {
    var wrap = document.createElement('div');
    wrap.className = 'faq-item';

    var qId = 'q-' + item.id;
    var aId = 'a-' + item.id;
    var isOpen = !!state.open[item.id];

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'faq-question';
    button.id = qId;
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-controls', aId);
    button.textContent = item.question;

    var panel = document.createElement('div');
    panel.className = 'faq-answer';
    panel.id = aId;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', qId);
    panel.hidden = !isOpen;

    item.answer.forEach(function (block) {
      if (block.type === 'ul') {
        var ul = document.createElement('ul');
        block.items.forEach(function (text) {
          var li = document.createElement('li');
          appendInline(li, text);
          ul.appendChild(li);
        });
        panel.appendChild(ul);
      } else {
        var p = document.createElement('p');
        appendInline(p, block.text);
        panel.appendChild(p);
      }
    });

    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
      if (expanded) {
        delete state.open[item.id];
      } else {
        state.open[item.id] = true;
      }
    });

    wrap.appendChild(button);
    wrap.appendChild(panel);
    return wrap;
  }

  function renderTabs() {
    var tabs = [{ id: 'all', label: 'すべて' }].concat(FAQ_CATEGORIES);
    els.tabs.textContent = '';
    tabs.forEach(function (tab) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'tab';
      b.textContent = tab.label;
      b.setAttribute('aria-pressed', String(state.category === tab.id));
      b.addEventListener('click', function () {
        state.category = tab.id;
        renderTabs();
        renderList();
      });
      els.tabs.appendChild(b);
    });
  }

  function renderList() {
    var visible = FAQ_ITEMS.filter(matches);
    els.list.textContent = '';

    if (state.category === 'all') {
      FAQ_CATEGORIES.forEach(function (cat) {
        var items = visible.filter(function (i) { return i.category === cat.id; });
        if (items.length === 0) return;
        var h = document.createElement('h2');
        h.className = 'category-heading';
        h.textContent = cat.label;
        els.list.appendChild(h);
        items.forEach(function (i) { els.list.appendChild(buildItem(i)); });
      });
    } else {
      visible.forEach(function (i) { els.list.appendChild(buildItem(i)); });
    }

    els.count.textContent = '全' + FAQ_ITEMS.length + '件中 ' + visible.length + '件を表示';
    var isEmpty = visible.length === 0;
    els.empty.hidden = !isEmpty;
    els.list.hidden = isEmpty;
  }

  function onSearch() {
    state.query = normalize(els.input.value);
    els.clear.hidden = els.input.value === '';
    renderList();
  }

  els.input.addEventListener('input', onSearch);
  els.clear.addEventListener('click', function () {
    els.input.value = '';
    onSearch();
    els.input.focus();
  });

  renderTabs();
  renderList();
})();
