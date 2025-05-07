export interface Team {
  name: string;
  slug: string;
}

export interface TeamState {
  teams: Team[];
  loading: boolean;
  error: string | null;
  isCreateTeamDialogOpen: boolean;
}