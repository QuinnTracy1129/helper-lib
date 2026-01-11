export function calculateDueDate(startingDate, term) {
  if (!startingDate || !term?.days) {
    return {
      dueAt: null,
      diffDays: null,
      diffColor: 'text-base-content',
    };
  }

  const start = new Date(startingDate);

  // dueAt = startingDate + term days (preserve time)
  const dueDate = new Date(start);
  dueDate.setDate(dueDate.getDate() + Number(term.days));

  // Today (normalized only for comparison)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Copy dueDate only for diff calculation
  const dueDateForDiff = new Date(dueDate);
  dueDateForDiff.setHours(0, 0, 0, 0);

  const diffTime = dueDateForDiff.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let diffColor = 'text-success';

  if (diffDays <= 1) {
    // 🔴 Due today or overdue
    diffColor = 'text-error';
  } else if (diffDays <= 5) {
    // 🟡 2–5 days remaining
    diffColor = 'text-warning';
  }

  return {
    dueAt: dueDate.toISOString(),
    diffDays,
    diffColor,
  };
}
