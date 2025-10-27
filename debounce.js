

function debounce(func, wait, immediate = false) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function as the first argument');
  }
  // timer id held in closure; not exposed or mutated externally.
  let timeout = null;
  return function(...args) {
    const context = this;
    let result;

    const later = function() {
      // clear the timeout reference to allow future leading calls
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    // reset timer on every call
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      result = func.apply(context, args);
    }

    return result;
  };
}

// === Simple tests ===
// Run with: node "c:\\Users\\imran\\Desktop\\js-assignment\\debounce.js"
if (require.main === module) {
  console.log('Running debounce tests...');

  // Test 1: Trailing debounce (default behavior)
  let count = 0;
  const incr = () => { count++; console.log('[trailing] executed', count); };
  const dIncr = debounce(incr, 100);

  // Call multiple times rapidly — only one execution should happen after calls stop
  dIncr();
  dIncr();
  dIncr();

  setTimeout(() => {
    try {
      console.assert(count === 1, `[trailing] expected 1 execution, got ${count}`);
      console.log('[trailing] test passed');
    } catch (err) {
      console.error('[trailing] test FAILED:', err.message || err);
    }
  }, 250);

  // Test 2: Leading debounce (immediate = true)
  let imCount = 0;
  const impr = () => { imCount++; console.log('[immediate] executed', imCount); };
  const dImpr = debounce(impr, 200, true);

  // First call should execute immediately; subsequent rapid calls should not
  dImpr(); // immediate -> should increment to 1
  dImpr();
  dImpr();

  setTimeout(() => {
    try {
      console.assert(imCount === 1, `[immediate] expected 1 execution early, got ${imCount}`);
      console.log('[immediate] early assertion passed');
    } catch (err) {
      console.error('[immediate] early assertion FAILED:', err.message || err);
    }
  }, 50);

  // After the wait has passed, calling again should trigger another immediate execution
  setTimeout(() => {
    dImpr(); // should run again -> imCount 2
  }, 300);

  setTimeout(() => {
    try {
      console.assert(imCount === 2, `[immediate] expected 2 executions final, got ${imCount}`);
      console.log('[immediate] final assertion passed');
      console.log('All debounce tests completed');
    } catch (err) {
      console.error('[immediate] final assertion FAILED:', err.message || err);
    }
  }, 650);
}

module.exports = debounce;
