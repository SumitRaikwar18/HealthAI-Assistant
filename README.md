
# HealthAI Assistant

A modern health assistant application powered by AI that helps users analyze symptoms and chat with an AI health assistant.

## KendoReact Components Used

This project uses the following free KendoReact components:

| Component | Code Snippet | Used In |
|-----------|--------------|---------|
| 1. Button | `<Button themeColor="primary">Click Me</Button>` | src/components/KendoButton.tsx |
| 2. Input | `<Input value={value} onChange={onChange} />` | src/components/KendoInput.tsx |
| 3. Label | `<Label editorId={htmlFor} className={className}>{text}</Label>` | src/components/KendoLabel.tsx |
| 4. Chip | `<Chip text={text} removable={removable} />` | src/components/KendoChip.tsx |
| 5. Avatar | `<Avatar type="circle" size="medium">{src ? <img src={src} alt="User" /> : "U"}</Avatar>` | src/components/KendoAvatar.tsx |
| 6. Loader | `<Loader size={size} type={type} />` | src/components/KendoLoader.tsx |
| 7. Switch | `<Switch checked={checked} onChange={onChange} />` | src/components/KendoSwitch.tsx |
| 8. Badge | `<Badge themeColor={themeColor} rounded={rounded}>{children}</Badge>` | src/components/KendoBadge.tsx |
| 9. TileLayout | `<TileLayout columns={columns} items={items} gap={{ rows: gap, columns: gap }} />` | src/components/KendoTileLayout.tsx |
| 10. Card | `<Card className="shadow-md h-full">{children}</Card>` | src/components/FeatureCard.tsx |

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Features

- **Symptom Analysis**: Get instant analysis of your symptoms with AI-powered insights
- **Healthcare Chat**: Chat with our AI assistant about any health concerns or questions
- **Privacy Focused**: Your health data stays private and secure with our advanced protection
- **24/7 Availability**: Access health insights anytime, anywhere with our always-on service

## Technologies Used

- Vite
- TypeScript
- React
- KendoReact
- Tailwind CSS
- React Router DOM

## Project Structure

- `/src/components`: Reusable components including KendoReact wrappers
- `/src/pages`: Main application pages
- `/src/hooks`: Custom React hooks
