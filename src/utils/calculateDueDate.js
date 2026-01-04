export function calculateDueDate(createdAt, term) {
  if (!createdAt || !term?.days) {
    return {
      due: null,
      diff: null,
      diffColor: 'text-base-content',
    };
  }

  const createdDate = new Date(createdAt);

  // Due date = createdAt + term days
  const dueDate = new Date(createdDate);
  dueDate.setDate(dueDate.getDate() + Number(term.days));

  const today = new Date();

  // Normalize time (avoid timezone edge cases)
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  const diffTime = dueDate.getTime() - today.getTime();
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
    due: dueDate,
    diff: diffDays,
    diffColor,
  };
}
