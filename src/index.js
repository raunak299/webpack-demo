import axios from "axios";
import dayjs from 'dayjs';
import {cube} from './math'

// Function to fetch data from a given URL using Axios
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    console.log('Fetched Data:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}



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

      element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
      ].join('\n\n');

      //using axios
      fetchData('https://jsonplaceholder.typicode.com/posts/1');
      // using dayjs
      const today = dayjs(); // Get current date and time
      const formattedDate = today.format('YYYY-MM-DD HH:mm:ss');

      return element;
    })
    .catch((error) => "An error occurred while loading the component");
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
