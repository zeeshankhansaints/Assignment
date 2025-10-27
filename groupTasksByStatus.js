

function groupTasksByStatus(tasks) {
  if (!Array.isArray(tasks)) {
    throw new TypeError('Expected an array of task objects');
  }

  return tasks.reduce((acc, task) => {
    // Do not mutate task; destructure required fields with defaults.
    const { status = 'unknown', title } = task;
    if (typeof title === 'undefined') return acc; // skip malformed entries

    // Initialize array for status if needed (acc is a fresh object)
    if (!Object.prototype.hasOwnProperty.call(acc, status)) {
      acc[status] = [];
    }
    // Push title into the status array (acc is new, so safe to mutate)
    acc[status].push(title);
    return acc;
  }, {});
}
// --- Simple test harness ---
function test() {
  const input = [
    { id: 1, title: 'Setup project', status: 'todo' },
    { id: 2, title: 'Write unit tests', status: 'in-progress' },
    { id: 3, title: 'Deploy to staging', status: 'done' },
    { id: 4, title: 'Fix bugs', status: 'in-progress' },
  ];

  const expected = {
    todo: ['Setup project'],
    'in-progress': ['Write unit tests', 'Fix bugs'],
    done: ['Deploy to staging'],
  };

  const output = groupTasksByStatus(input);
  console.log(JSON.stringify(output) === JSON.stringify(expected) ? 'Passed' : 'Failed');
}

// Run test when executed directly
if (require.main === module) {
  test();
}

module.exports = groupTasksByStatus;
