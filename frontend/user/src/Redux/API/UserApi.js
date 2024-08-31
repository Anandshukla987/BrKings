export function fetchLoggedInUserOrders() {
    return new Promise(async (resolve) =>{
      const response = await fetch('https://fakestoreapi.com/carts/user/2') 
      const data = await response.json()
      resolve({data})
    }
    );
  }
  export function fetchLoggedInUser() {
    return new Promise(async (resolve) =>{
      const response = await fetch('https://fakestoreapi.com/users/1') 
      const data = await response.json()
      resolve({data})
    }
    );
  }
  export function updateUser(update) {
    return new Promise(async (resolve) => {
      const response = await fetch('https://fakestoreapi.com/users/7', {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  