export interface CreateTeamRequest {
  slug: string;
  name: string;
  ownerId: string;
  visibility: 'PUBLIC' | 'PRIVATE';
}