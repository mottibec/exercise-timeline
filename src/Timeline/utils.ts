import {Trace, SpanWithChildren} from './types';

export const buildSpanTree = (trace: Trace): SpanWithChildren[] => {
  // Create a map of SpanWithChildren keyed by spanId
  const spanMap: { [id: string]: SpanWithChildren } = {};
  const rootSpans: SpanWithChildren[] = [];

  for (const span of trace.spans) {
    const spanWithChildren: SpanWithChildren = { ...span, children: [] };
    spanMap[span.spanId] = spanWithChildren;
    
    // If no parentSpanId, this is a root span
    if (!span.parentSpanId) {
      rootSpans.push(spanWithChildren);
    }
  }

  // Populate the children arrays
  for (const span of trace.spans) {
    const parentSpan = spanMap[span.parentSpanId];
    if (parentSpan) {
      parentSpan.children.push(spanMap[span.spanId]);
    }
  }

  return rootSpans;
}

export const calculateTraceDuration = (trace: Trace): [Date, Date, number] => {
  let earliestStartTime = Infinity;
  let latestEndTime = -Infinity;

  for (const span of trace.spans) {
    const startTime = Date.parse(span.startTime);
    const endTime = startTime + span.duration / 1e6; // Convert duration from ns to ms

    if (startTime < earliestStartTime) {
      earliestStartTime = startTime;
    }

    if (endTime > latestEndTime) {
      latestEndTime = endTime;
    }
  }

  // Convert the start and end times from ms since the Unix epoch back to ISO 8601 strings
  const earliestStartTimeStr = new Date(earliestStartTime);
  const latestEndTimeStr = new Date(latestEndTime);

  // Total duration in ms
  const totalDuration = latestEndTime - earliestStartTime;

  return [earliestStartTimeStr, latestEndTimeStr, totalDuration];
}