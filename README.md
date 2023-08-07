## Trace Timeline Coding Challenge

### Overview
As a potential member of our diagnostics tool development team, your task is to design and implement a key feature: a React component named `Timeline`. This component visualizes a trace timeline, constituted by multiple spans, in the form of a waterfall diagram.

### Requirements
- **Component Development**: Create a Timeline React component that accepts a trace prop. A trace is an object with an `id` and `spans`. Each span has the following properties: `spanId`, `parentSpanId`, `serviceName`, `operationName`, `startTime`, and `duration`.
- **Span Rendering**: Render each span within the `Timeline` component. Display the `serviceName` and `operationName` in a hierarchical structure representing the parent-child relationships between spans. Each span is also represented by a bar on the timeline. The bar's length and position correspond to the span's `duration` and `startTime` relative to the entire trace.
- **Span Interaction**: Implement a collapse/expand feature for spans with children. This should include a button on each span that toggles the visibility of its child spans.

Here's an ASCII diagram illustrating the expected timeline structure:
```bash
Frontend Service - Load Checkout Page: --------------------------------------------------------------------------------
     Product Service - Get Product Details: -------------
     Inventory Service - Check Stock:       ----------------------
     Payment Service - Process Payment:                     -----------------------------------------
          Email Service - Send Confirmation Email:                                     -----------------
```

### Bonus Points
- **Color Coding**: Enhance your `Timeline` component to visually distinguish different services. Assign a unique, distinct color to each `serviceName` and consistently use this color across the timeline.

- **Performance Optimization**: Optimize your `Timeline` component to efficiently handle large traces with over 100,000 spans. Consider performance optimizations and explain your design decisions.

### Project Structure
- The `src` directory contains two folders: `Timeline` and `data`.
- The `Timeline` folder houses the `Timeline.tsx` file where you'll implement your component.
- The `data` folder includes a `trace.json` file, which provides the trace data for rendering the timeline.
- The `Timeline` folder also contains a `utils.ts` file offering helper functions that could be beneficial for your task.

### Instructions
- Use the `trace.json` file in the `data` folder as the input for your Timeline component.
- Feel free to use the helper functions in the utils.ts file.
- You may install and use any npm packages as needed.

### Submission
- You have 4 hours to complete this challenge.
- You're free to use any resources you need (Google, Stack Overflow, chatGPT, etc.).


We appreciate your efforts and are excited to see your creative solutions. Good luck!





