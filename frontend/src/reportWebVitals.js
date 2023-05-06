/*
Documentation by ChatGPT (modified):

The reportWebVitals function is a utility function that is used to report web vitals data to a third-party service or analytics platform. 
It takes in a single argument, onPerfEntry, which is a callback function that will be called with the web vitals data.

The function first checks if the onPerfEntry argument is a function and then imports the web-vitals library. 
Once the library is imported, it calls the getCLS, getFID, getFCP, getLCP, and getTTFB functions from the library, passing in the onPerfEntry callback function as an argument.

Each of these functions calculates a different web vital metric, including Cumulative Layout Shift (CLS), First Input Delay (FID), First Contentful Paint (FCP), Largest Contentful Paint (LCP), and Time to First Byte (TTFB). 
Once the metrics are calculated, they are passed to the onPerfEntry callback function.

This function is typically used in conjunction with other performance monitoring tools to track and analyze website performance over time. 
By reporting web vitals data, developers can identify areas for improvement and optimize their website for better performance and user experience.
*/

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
