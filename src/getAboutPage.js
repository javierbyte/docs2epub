function getAboutPageTemplate(tocObj) {
  return `
<div>
  <h3>About this book.</h3>
  <div>
    Documentation generated by <b>docs2epub</b> [http://javier.xyz/docs2epub/] on ${new Date()}, scrapped from ${tocObj.docsUrl}.
  </div>
  <br /><br />
  <div>
    Find more about this project on ${tocObj.repoUrl}.
    LICENCE of ${tocObj.title}: ${tocObj.licenceUrl}
  </div>
</div>
  `;
}

function getAboutPage(tocObj) {
  return {
    title: `${tocObj.title} documentation`,
    level: 0,
    result: {
      title: `${tocObj.title} documentation`,
      content: getAboutPageTemplate(tocObj)
    }
  };
}

module.exports = getAboutPage;
