import React from 'react';

export function SearchIcon({ fill = '#90939C', ...props }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.32 14.9L21.71 20.3C21.8725 20.4925 21.9565 20.7392 21.945 20.9908C21.9335 21.2425 21.8275 21.4806 21.6481 21.6574C21.4687 21.8343 21.2292 21.9369 20.9774 21.9448C20.7256 21.9527 20.4801 21.8653 20.29 21.7L14.91 16.32C13.3027 17.5686 11.2799 18.1576 9.25358 17.9672C7.22725 17.7767 5.34968 16.8211 4.00319 15.2949C2.65671 13.7687 1.94254 11.7867 2.0061 9.7524C2.06967 7.71812 2.9062 5.78456 4.34535 4.34541C5.7845 2.90626 7.71806 2.06973 9.75234 2.00617C11.7866 1.9426 13.7686 2.65677 15.2948 4.00326C16.821 5.34974 17.7766 7.22731 17.9671 9.25364C18.1576 11.28 17.5685 13.3027 16.32 14.91V14.9ZM9.99995 16C11.5913 16 13.1174 15.3679 14.2426 14.2427C15.3678 13.1174 16 11.5913 16 10C16 8.40871 15.3678 6.88259 14.2426 5.75737C13.1174 4.63215 11.5913 4.00001 9.99995 4.00001C8.40865 4.00001 6.88253 4.63215 5.75731 5.75737C4.63209 6.88259 3.99995 8.40871 3.99995 10C3.99995 11.5913 4.63209 13.1174 5.75731 14.2427C6.88253 15.3679 8.40865 16 9.99995 16Z"
        fill={fill}
      />
    </svg>
  );
}