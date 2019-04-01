function restoreMemo() {
  const dom = document.querySelector('.memo-area')
  dom.value = localStorage.memo

  dom.addEventListener('keyup', () => {
    const text = dom.value
    localStorage.memo = text
  })
}

function init() {
  chrome.management.getAll(apps => {
    console.log(apps)
    apps.map(app => {
      if (app.enabled && app.isApp) {
        setApp(app) ;
      }
    })
  });
};

function setApp(app) {
  const li = document.createElement('li');
  li.className = 'apps-list-app';
  li.innerHTML = `
    <img class="apps-image" src="${app.icons[0].url}"/>
    <span class="appId-${app.id} apps-name">${app.shortName}</span>
  `;
  document.querySelector('.apps-list').appendChild(li);

  li.addEventListener('click', () => {
    chrome.management.launchApp(app.id);
    if (app.launchType === 'OPEN_AS_REGULAR_TAB') window.close();
  })
};

(() => {
  init();
  restoreMemo();
})();
