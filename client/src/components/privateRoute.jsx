import { useAuth } from "../contexts/Auth";
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {

    let auth = useAuth();

    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.currentUser ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute