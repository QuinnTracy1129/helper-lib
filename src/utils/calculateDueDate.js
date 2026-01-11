export function calculateDueDate(startingDate, term, dueAt) {
  if (!startingDate || (!term?.days && !dueAt)) {
    return {
      dueAt: null,
      diffDays: null,
      diffColor: 'text-base-content',
    };
  }

  let dueDate;

  if (dueAt) {
    // Use explicit dueAt (override term.days)
    dueDate = new Date(dueAt);
  } else {
    // Calculate from startingDate + term.days
    const start = new Date(startingDate);
    dueDate = new Date(start);
    dueDate.setDate(dueDate.getDate() + Number(term.days));
  }

  // Today (normalized only for comparison)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Normalize dueDate only for diff calculation
  const dueDateForDiff = new Date(dueDate);
  dueDateForDiff.setHours(0, 0, 0, 0);

  const diffTime = dueDateForDiff.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let diffColor = 'text-success';

  if (diffDays <= 1) {
    diffColor = 'text-error'; // due today or overdue
  } else if (diffDays <= 5) {
    diffColor = 'text-warning'; // approaching due
  }

  return {
    dueAt: dueDate.toISOString(),
    diffDays,
    diffColor,
  };
}
