export interface Span {
    spanId: string;
    traceId: string;
    parentSpanId?: string;
    startTime: string;
    duration: number; //in ns
    serviceName: string;
    operationName: string;
  }
  
  export interface Trace {
    id: string;
    spans: Span[]; 
  }
  
  export interface SpanWithChildren extends Span {
    children: SpanWithChildren[]; 
  }