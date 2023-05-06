/*
Documentation by ChatGPT (modified):

The NoMatch.js file contains a functional component called NoMatch. 
This component returns a simple error message in the form of a div element with a heading of "Error!". 
This component is typically used in a React application to handle cases where a user navigates to a route that does not exist.

The component can be imported and used in other components by importing it using the "import" statement and then rendering it within the JSX code of the parent component.

For example, if a user navigates to a route that does not exist, the router can be configured to render the NoMatch component instead of the expected component. 
This provides a better user experience by informing the user that the requested page does not exist.
*/


function NoMatch() {
  return (
    <div>
      <h3>Error!</h3>
    </div>
  );
}

export default NoMatch;
