// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scope1() {
  const routes = {
    home: "/",
    admin: "/admin",
    users: "/users",
  };

  routes.home; // type string

  // multiple sources of truth :(
  const goToRoute = (route: "/" | "/admin" | "/users") => {
    console.log(`Routing to: '${route}'...`);
  };

  // Autocomplete works
  goToRoute("/");

  // Argument of type 'string' is not assignable to parameter
  // of type '"/" | "/admin" | "/users"'
  goToRoute(routes.admin);

  // routes.admin is mutable...
  routes.admin = "...oops";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scope2() {
  // We could use Object.freeze() to make the object immutable...
  // But Object.freeze() works at runtime.
  const routes = Object.freeze({
    home: "/",
    admin: "/admin",
    users: "/users",
    nested: {
      foo: "/nested/foo ",
    },
  });

  routes.home; // type "/"

  const goToRoute = (route: "/" | "/admin" | "/users") => {
    console.log(`Routing to: '${route}'...`);
  };

  // routes.admin is now immutable, but...
  routes.admin = "...oops";

  // routes.nested is still mutable :(
  routes.nested.foo = "...bar";

  goToRoute(routes.admin);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scope3() {
  const routes = {
    home: "/",
    admin: "/admin",
    users: "/users",
    nested: {
      foo: "/nested/foo ",
    },
  } as const;

  routes.users; // type "/users"

  const goToRoute = (route: "/" | "/admin" | "/users") => {
    console.log(`Routing to: '${route}'...`);
  };

  // routes.admin is now immutable!!
  routes.admin = "...oops";

  // routes.nested is also immutable!!
  routes.nested.foo = "...bar";

  goToRoute(routes.admin);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scope4() {
  const routes = {
    home: "/",
    admin: "/admin",
    users: "/users",
  } as const;

  // Object.keys() on the type level
  type RouteKey = keyof typeof routes;

  // Object.values() on the type level
  type Route = (typeof routes)[RouteKey];

  routes.users; // type "/users"

  const goToRoute = (route: Route) => {
    console.log(`Routing to: '${route}'...`);
  };

  goToRoute("/users");
}
