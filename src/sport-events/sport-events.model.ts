export type SportEventStatus = 'PRE' | 'LIVE' | 'REMOVED';

export type SportCompetition = 'FOOTBALL';

export type ScoreType =
  | 'CURRENT'
  | 'PERIOD_1'
  | 'PERIOD_2'
  | 'PERIOD_3'
  | 'PERIOD_4'
  | string;

export type CompetitorType = 'HOME' | 'AWAY';

export type Score = {
  type: ScoreType;
  home: string;
  away: string;
};

export type Competitor = {
  type: CompetitorType;
  name: string;
};

export type OutgoingSportEvent = {
  id: string;
  status: SportEventStatus;
  scores: { [key in ScoreType]: Score };
  startTime: string;
  sport: SportCompetition;
  competitors: { [key in CompetitorType]: Competitor };
  competition: string;
};

export type SportEvents = {
  [id: string]: OutgoingSportEvent;
};
