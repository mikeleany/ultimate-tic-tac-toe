import { useState } from 'react'
import './Settings.css'

function Mode({ label, value, current, setMode }) {
  return (
    <div>
      <label>
        <input
          type='radio'
          name='mode'
          value={value}
          checked={current === value}
          required
          onChange={e => setMode(e.target.value)}
        />
        {label}
      </label>
    </div>
  )
}

export function Settings({ settings, setSettings, settingsDialog }) {
  const [mode, setMode] = useState(settings.mode);
  const [difficulty, setDifficulty] = useState(settings.difficulty);

  function onCancel() {
    setMode(settings.mode);
    setDifficulty(settings.difficulty);
    settingsDialog.current.close();
  }

  function onSubmit() {
    const newSettings = { ...settings, mode, difficulty };
    setSettings(newSettings);
  }

  return (
    <dialog ref={settingsDialog}>
      <h2>Game Settings</h2>
      <form className='settings' action='dialog' onSubmit={onSubmit}>
        <fieldset className='settings-mode'>
          <legend>Mode</legend>
          <Mode label='Single player' value='single-player' current={mode} setMode={setMode} />
          <Mode label='Two player' value='two-player' current={mode} setMode={setMode} />
          <Mode label='Demo' value='demo' current={mode} setMode={setMode} />
        </fieldset>
        <label>
          Difficulty ({difficulty})<br />
          <input type='range' name='difficulty' list='ai-difficulty' min={0} max={15} value={difficulty} onChange={e => setDifficulty(e.target.value)} />
          <datalist id='ai-difficulty'>
            <option value='0' label='0'></option>
            <option value='5' label='5'></option>
            <option value='10' label='10'></option>
            <option value='15' label='15'></option>
          </datalist>
        </label>
        <div className='settings-buttons'>
          <button type='button' onClick={onCancel}>Cancel</button>
          <button type='submit' formMethod='dialog' autoFocus>Apply</button>
        </div>
      </form>
    </dialog>
  )
}
