# TEditor GV Bulk Tools

A community-driven JavaScript tool for bulk editing player attributes and special skills in PES 2021 through [TEditor](https://teditor.app/).

The goal of this project is to make player database editing faster and easier by allowing users to apply changes to multiple players at once.

## Features

- **Bulk attribute editing:** Increase or decrease selected numerical attributes by a configurable amount.
- **Position filtering:** Target all valid players or filter players by their registered positions.
- **Special skills management:** Enable or disable selected special skills for multiple players.
- **Preview before applying:** Review the planned changes before confirming them.
- **Value validation:** Respect the supported value range for each field.
- **Multilingual interface:** Provide a language selector for supported interface languages.
- **Change verification:** Check whether the requested changes were applied to TEditor's current data.

## Requirements

- A modern web browser, such as Google Chrome or Microsoft Edge.
- Access to [TEditor](https://teditor.app/).
- Basic familiarity with browser Developer Tools and the JavaScript Console.

No Node.js installation, package manager, or build process is required. The script is designed to run directly in the browser.

## Installation and Usage

### 1. Open TEditor

Visit [TEditor](https://teditor.app/) and load your PES 2021 player data.

**Important:** Make a backup of your original data before applying bulk changes.

### 2. Open the browser Console

In Google Chrome on Windows or Linux:

1. Press `F12` to open Developer Tools.
2. Select the **Console** tab.

Alternatively, press `Ctrl + Shift + J` to open the Console directly.

Shortcuts may differ in other browsers or operating systems.

### 3. Copy the script

Open `main.js` in this repository and copy its entire contents.

### 4. Authorize pasting if required

Chrome may display a security warning and prevent you from pasting code into the Console.

If this happens, type the following directly into the Console and press `Enter`:

`allow pasting`

This authorizes pasting in the Console. It does **not** verify that the code is safe. Only run scripts you trust and have reviewed.

This confirmation may not be required in every browser.

### 5. Run the script

Paste the contents of `main.js` into the Console and press `Enter`.

The Bulk Player Editor panel should appear on the TEditor page.

### 6. Configure your changes

Depending on the available options in the current version:

1. Select the players you want to edit by position.
2. Choose the numerical attributes to modify.
3. Set the amount to add or subtract.
4. Select any special skills you want to enable or disable.
5. Review the preview before applying the changes.

### 7. Verify and save

After applying the changes, verify the results in TEditor.

**You must save or export your data manually using TEditor's own functionality.** Running the script does not automatically download or save a modified file to your computer.

Avoid reloading the page or closing the editor before saving your work.

## Numerical Attributes and Value Limits

Different fields have different valid ranges. The tool should validate each field according to its own limits rather than assuming that all numerical values use the same range.

### Standard player attributes

Most standard player ratings use a range of **40–99**.

Examples include:

- Attacking Prowess
- Ball Control
- Tight Possession
- Low Pass
- Lofted Pass
- Finishing
- Place Kicking
- Curl
- Speed
- Acceleration
- Jump
- Physical Contact
- Balance
- Stamina
- Ball Winning
- Aggression
- Goalkeeper Awareness
- Goalkeeper Catching
- Goalkeeper Reach
- Defensive Prowess
- Goalkeeper Clearing
- Heading Ability
- Dribbling
- Goalkeeper Reflexes
- Kicking Power

For example, if a player's Speed is 90 and you increase it by 5, the resulting value should be 95. If the current value is 97 and you increase it by 5, the result must not exceed the maximum of 99.

### Fields with different limits

| Field | Valid range | Description |
|---|---:|---|
| Weak Foot Usage | 1–4 | How frequently the player uses their weaker foot. |
| Weak Foot Accuracy | 1–4 | The player's accuracy when using their weaker foot. |
| Form / Conditioning | 1–8 | The player's conditioning rating. |
| Injury Resistance | 1–3 | The player's injury resistance rating. |
| Age | 15–50 | The player's age in years. |
| Height | 155–210 | The player's height in centimeters. |
| Weight | 30–129 | The player's weight in kilograms. |
| Attitude | 1–3 | The attitude value represented in the editor. |
| Reputation | 1–8 | The reputation value represented in the editor. |

These ranges reflect the limits identified during development and should be checked against the current TEditor version.

### Fields excluded from standard rating edits

The standard attribute selector is intended for player ratings, not every field in the database.

Examples of fields that should remain outside the standard rating selector include:

- Player IDs and other identifiers.
- Country IDs and call-name IDs.
- Goal celebration settings.
- Animation and motion settings.
- Internal metadata fields.

Other fields, such as age, height, weight, and reputation, have different ranges and should only be exposed through a dedicated option if supported.

## Player Positions

The position filter uses these position codes:

| Code | Position |
|---|---|
| GK | Goalkeeper |
| CB | Centre Back |
| DMF | Defensive Midfielder |
| CMF | Central Midfielder |
| LB | Left Back |
| AMF | Attacking Midfielder |
| RWF | Right Wing Forward |
| LWF | Left Wing Forward |
| RB | Right Back |
| CF | Centre Forward |

Select the positions you want to target. If no position filter is applied, the tool can target all valid players.

Position filtering depends on the position information available in the loaded player database.

## Special Skills

Special skills are different from numerical attributes. Instead of adding or subtracting points, the user selects skills to enable or disable.

Examples include:

| Skill | Description |
|---|---|
| Scissors Feint | Enables the scissors-feint skill move. |
| Double Touch | Enables the double-touch skill move. |
| Flip Flap | Enables the flip-flap skill move. |
| Marseille Turn | Enables the Marseille turn. |
| Sombrero | Enables the sombrero skill move. |
| Heading Skill | Enables the specialized heading skill. |
| Long Range Drive | Enables the long-range drive skill. |
| Chip Shot Control | Enables the chip-shot control skill. |
| Long Range Shooting | Enables the long-range shooting skill. |
| Knuckle Shot | Enables the knuckle-shot skill. |
| Dipping Shot | Enables the dipping-shot skill. |
| Rising Shot | Enables the rising-shot skill. |
| Acrobatic Finishing | Enables acrobatic finishing. |
| Heel Trick | Enables the heel-trick skill. |
| First-time Shot | Enables the first-time-shot skill. |
| One-touch Pass | Enables the one-touch-pass skill. |
| Through Passing | Enables the through-passing skill. |
| Weighted Pass | Enables the weighted-pass skill. |
| Pinpoint Crossing | Enables the pinpoint-crossing skill. |
| Outside Curler | Enables the outside-curler skill. |
| Rabona | Enables the rabona skill. |
| No Look Pass | Enables the no-look-pass skill. |
| Low Lofted Pass | Enables the low-lofted-pass skill. |
| GK Low Punt | Enables the goalkeeper low-punt skill. |
| GK High Punt | Enables the goalkeeper high-punt skill. |
| Long Throw | Enables the long-throw skill. |
| GK Long Throw | Enables the goalkeeper long-throw skill. |
| Penalty Specialist | Enables the penalty-specialist skill. |
| GK Penalty Saver | Enables the goalkeeper penalty-saving skill. |
| Gamesmanship | Enables the gamesmanship skill. |
| Man Marking | Enables the man-marking skill. |
| Track Back | Enables the track-back skill. |
| Interception | Enables the interception skill. |
| Acrobatic Clear | Enables the acrobatic-clearance skill. |
| Captaincy | Enables the captaincy skill. |
| Super-sub | Enables the super-sub skill. |
| Fighting Spirit | Enables the fighting-spirit skill. |

Other supported skills may include additional dribbling, passing, shooting, defensive, and movement abilities.

Descriptions are brief explanations of the skill names, not a complete specification of PES 2021's in-game mechanics.

## Recommended Workflow

1. Load the correct .ted file exported from PES2021 in TEditor.
2. Make a backup of your original data.
3. Select the players you want to modify.
4. Choose the numerical attributes or special skills.
5. Configure the changes.
6. Review the preview carefully.
7. Apply the changes.
8. Verify the resulting values in TEditor.
9. Save or export the modified data through TEditor's own functionality.

When editing a large group of players, use small adjustments and review the preview before confirming. Bulk changes can affect many players at once.

## Limitations

- **TEditor dependency:** The script depends on TEditor's page structure and internal data store. Changes to TEditor may require updates to this project.
- **Current session:** The script modifies the data loaded in the current browser session.
- **Manual saving:** Changes applied by the script are not automatically saved to a file.
- **Field-specific limits:** Each numerical field must be validated against its own supported range.
- **Position data:** Filtering depends on the position information available in the loaded database.
- **PES 2021 scope:** The tool is designed for player-data editing through TEditor. It is not intended to modify game executable files.
- **Unofficial project:** This is an independent community utility, not an official TEditor feature.
- **Manager photo:** When importing a `.ted` file exported by TEditor into the game, the manager's photo may be lost.

## Troubleshooting

### The panel does not appear

- Confirm that TEditor is open and your player data is loaded.
- Check the Console for JavaScript errors.
- Verify that you copied the complete contents of `main.js`.
- Confirm that the script is compatible with the current TEditor version.

### Chrome will not let me paste code

If Chrome displays a warning about pasting, type `allow pasting` into the Console and press `Enter`. Then paste the script.

Never execute unfamiliar code just to bypass a browser warning.

### The changes do not appear in the saved file

Applying changes in the panel does not necessarily save them to disk. Use TEditor's save/export functionality after verifying the changes.

## Contributing

Contributions, bug reports, and suggestions are welcome.

When reporting a problem, please include:

- The browser and version you are using.
- The steps needed to reproduce the issue.
- The affected attribute or special skill.
- The expected behavior and the actual result.
- Any relevant Console error messages.

Please avoid sharing personal information or modified player databases containing information you do not have permission to distribute.

## Disclaimer

This is an independent community project and is not affiliated with or endorsed by the developers of TEditor or Konami.

PES and related names are trademarks of their respective owners. This project is intended as a community utility for editing player data.

## License

This project is distributed under the MIT License. See the `LICENSE` file for details.