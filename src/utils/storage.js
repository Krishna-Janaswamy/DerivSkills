export function saveActivePlan(planData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('activeRoadmapPlan', JSON.stringify(planData));
  }
}

export function getActivePlan() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('activeRoadmapPlan');
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function clearActivePlan() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('activeRoadmapPlan');
  }
}
