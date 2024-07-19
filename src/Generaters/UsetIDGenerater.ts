export function USERID(prefix: string): string {
    const randomId = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
    return `${prefix}${randomId}`;
  }
  
  export function ADMIN(prefix: string): string {
    const randomId = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
    return `${prefix}${randomId}`;
  }
  export function WHEREHOUSE(prefix: string): string {
    const randomId = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
    return `${prefix}${randomId}`;
  }
  export function DEALER(prefix: string): string {
    const randomId = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
    return `${prefix}${randomId}`;
  }
 



  // Example usage:
  // Outputs something like 'LS123456'
  