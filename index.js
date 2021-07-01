const fs = require('fs/promises');
const Mustache = require('mustache');
const fetch = require('node-fetch');

(async () => {
  const refreshDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Europe/Madrid'
  });
  const template = (await fs.readFile('./readme.mustache')).toString();
  const blogPosts = await fetch('https://antonio.laguna.es/feed/feed.json')
    .then(res => res.json());
  const posts = blogPosts.items.slice(0, 5);
  const newReadme = Mustache.render(
    template,
    { posts, refreshDate }
  );

  await fs.writeFile('./README.md', newReadme);
})();
