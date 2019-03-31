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
  li.innerHTML = `
    <img class="apps-image" src="${app.icons[0].url}"/>
    <span class="appId-${app.id}">${app.shortName}</a>
  `;
  document.querySelector('.apps-list').appendChild(li);

  li.addEventListener('click', () => {
    chrome.management.launchApp(app.id);
    if (app.launchType === 'OPEN_AS_REGULAR_TAB') window.close();
  })
};

(() => {
  init();
})();
