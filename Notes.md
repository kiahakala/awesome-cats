# NOTES

## Working with loaders:

- route loader property which requires a function
- function will be executed when the route is visited
- remove state value settings
- the loader function can be imported from the component
- executed in the browser

## Working with actions:

- used to send requests to the backend
- route action property which requires a function
- can be imported from the component
- executed in the browser

## Error Handling Options

- setError('Fetching cats failed')
- throw new Error()
- throw new Response(
  JSON.stringify({ message: 'Could not fetch cats :('}), {
  status: 500
  }
  )
- throw json() // React Router Dom function; creates response object

## Response Ok Options

- const resData = await response.json()
- setFetchedCats(resData.cats)
- return resData.cats
- return response

## Deferring Data Fetching

- Defer function enables rendering component before loading data
- Defer function executes the component's async fetch function
- Async function's response must be manually parsed (Cats.js line 34)
- Suspense component acts as a fallback

## Logout functionality

Implemented with a logout route => an action function removes the token from the local storage and redirects to the home page.

## Route protection

Implemented with a loader function that checks if the user is authenticated. If not, the user is redirected.
