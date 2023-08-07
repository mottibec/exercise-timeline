import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { SpanWithChildren, Trace } from "./types";
import { buildSpanTree, calculateTraceDuration } from "./utils";

export const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f7; /* Light gray background */
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", Helvetica,
    Arial, sans-serif; /* Apple system font */
`;

export const TimelineHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #fff; /* White background */
  color: #1c1c1e; /* Dark gray text */
  font-size: 1.25rem;
  border-bottom: 1px solid #e5e5ea; /* Light gray border */
`;

export const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: calc(100% - 50px); /* Subtract the height of the header */
  padding: 20px;
  overflow-y: auto; /* Scrollable if the content overflows */
`;

export const SpanBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px; /* Space between span bars */
`;

const DurationBar = styled.div`
  height: 20px;
  border-radius: 10px;
  background-color: #007aff; /* Blue color */
  box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth effect */
  transition: width 0.3s ease-in-out; /* Smooth transition effect for width changes */
`;

const SpanInformationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

interface SpanBarProps {
  span: SpanWithChildren;
  level: number;
  traceDuration: number;
  startTime: Date;
}
const SpanBarI: FC<SpanBarProps> = ({
  span,
  level,
  traceDuration,
  startTime,
}) => {
  const width = `${Math.max(
    1,
    Math.round((span.duration / traceDuration) * 100)
  )}%`;

  const relativeStartTime =
    new Date(span.startTime).getTime() - startTime.getTime(); // calculate relative start time
  const marginLeftPercentage = (relativeStartTime / traceDuration) * 100;
  const marginLeft = `calc(${marginLeftPercentage}% + ${level * 20}px)`; // combine percentage and level indentation

  return (
    <SpanBarWrapper style={{ marginLeft }}>
      <SpanInformationWrapper>
        <div
          style={{ color: "#1C1C1E", marginRight: "10px" }}
        >{`${span.serviceName} ${span.operationName}`}</div>
        <DurationBar
          style={{ width, marginLeft: marginLeftPercentage + "%" }}
        />
      </SpanInformationWrapper>
      {span.children.map((child) => (
        <SpanBarI
          span={child}
          level={level + 1}
          traceDuration={traceDuration}
          startTime={startTime}
        />
      ))}
    </SpanBarWrapper>
  );
};

interface TimelineProps {
  trace: Trace;
}

export const Timeline: FC<TimelineProps> = ({ trace }) => {
  const [spanTree, setSpanTree] = useState<SpanWithChildren[]>([]);
  const [traceDuration, setTraceDuration] = useState<number>(0);
  const [st, setSt] = useState<Date>(new Date());
  useEffect(() => {
    setSpanTree(buildSpanTree(trace));
    const [st, et, totalDuration] = calculateTraceDuration(trace);
    setTraceDuration(totalDuration);
    setSt(st);
  }, [trace]);

  return (
    <TimelineWrapper>
      <TimelineContent>
        {spanTree.map((span) => (
          <SpanBarI
            span={span}
            level={0}
            startTime={st}
            traceDuration={traceDuration}
          />
        ))}
      </TimelineContent>
    </TimelineWrapper>
  );
};
