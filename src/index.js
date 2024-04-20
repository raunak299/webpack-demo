
const getLodash = () => import(
  /* webpackPreload: true */
  /* webpackChunkName: 'lodash' */
  "lodash"
)

function getComponent() {
  return import(
    /* webpackPreload: true */
    /* webpackChunkName: 'lodash' */
    "lodash"
  )
    .then(({ default: { join } }) => {
      const element = document.createElement("div");

      element.innerHTML = join(["Hello", "webpack"], " ");

      return element;
    })
    .catch((error) => "An error occurred while loading the component");
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
