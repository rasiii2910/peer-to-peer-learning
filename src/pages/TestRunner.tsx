import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ConceptMatch from './ConceptMatch';
import { DebuggingRaceRun } from './DebuggingRace';

export default function TestRunner() {
  const { id } = useParams();

  // Map test ids from Tests.tsx to components
  switch (id) {
    case 't1':
      return <ConceptMatch />;
    case 't2':
      return <DebuggingRaceRun />;
    // future cases: t3, t4 -> other components
    default:
      // if id is missing or unknown, redirect back to tests list
      return <Navigate to="/tests" replace />;
  }
}
