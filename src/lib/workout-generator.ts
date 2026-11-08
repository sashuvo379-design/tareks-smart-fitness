export type FitnessGoal =
  | 'hypertrophy'
  | 'fat_loss'
  | 'strength'
  | 'athletic'
  | 'beginner';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type TrainingFrequency = '3_days' | '4_days' | '5_days' | '6_days';

export type EquipmentType = 'gym' | 'home' | 'calisthenics';

export type SessionDuration = '45_min' | '60_min' | '75_min';

export interface ExerciseItem {
  id: string;
  name: string;
  targetMuscle: string;
  equipment: string;
  sets: number;
  reps: string;
  restSeconds: number;
  rpe: string;
  tempo?: string;
  coachTip: string;
  completed?: boolean;
}

export interface WorkoutDay {
  dayNumber: number;
  dayTitle: string;
  focus: string;
  estimatedMinutes: number;
  warmup: string[];
  exercises: ExerciseItem[];
  cardioFinisher?: {
    machine: string;
    durationMinutes: number;
    protocol: string;
  };
  cooldown: string[];
}

export interface GeneratedWorkoutPlan {
  id: string;
  athleteName: string;
  goal: FitnessGoal;
  goalTitle: string;
  level: ExperienceLevel;
  frequency: TrainingFrequency;
  frequencyTitle: string;
  equipment: EquipmentType;
  duration: SessionDuration;
  createdAt: string;
  coachTarekAdvice: string;
  nutritionGuidelines: {
    dailyProteinGrams: string;
    calorieFocus: string;
    preWorkoutFuel: string;
    postWorkoutFuel: string;
    hydrationTarget: string;
  };
  schedule: WorkoutDay[];
}

export const GOAL_OPTIONS: { id: FitnessGoal; label: string; icon: string; description: string }[] = [
  {
    id: 'hypertrophy',
    label: 'Muscle Mass & Hypertrophy',
    icon: 'Flame',
    description: 'Maximize muscle size, density, and aesthetic symmetry using progressive overload and high-tension volume.',
  },
  {
    id: 'fat_loss',
    label: 'Fat Loss & High Shred (StairMaster)',
    icon: 'Zap',
    description: 'Torch body fat while preserving lean muscle with high-density supersets and Ascent StairMaster intervals.',
  },
  {
    id: 'strength',
    label: 'Raw Strength & Powerlifting',
    icon: 'Shield',
    description: 'Build brutal 1-rep-max power across Squats, Bench Press, and Deadlifts inside our 11-gauge power cages.',
  },
  {
    id: 'athletic',
    label: 'Athletic Conditioning & Agility',
    icon: 'Activity',
    description: 'Explosive power, cardiovascular stamina, core stability, and athletic functional movement.',
  },
  {
    id: 'beginner',
    label: 'Beginner Full-Body Foundation',
    icon: 'Award',
    description: 'Safe, master-level form instruction, joint strengthening, and neuromuscular conditioning to jumpstart your fitness journey.',
  },
];

export const FREQUENCY_OPTIONS: { id: TrainingFrequency; label: string; sub: string }[] = [
  { id: '3_days', label: '3 Days / Week', sub: 'Full Body A/B or Push-Pull-Legs (Ideal for busy professionals)' },
  { id: '4_days', label: '4 Days / Week', sub: 'Upper / Lower Power Split (Optimal balance of recovery & volume)' },
  { id: '5_days', label: '5 Days / Week', sub: 'PPL + Upper/Lower Body Split (Accelerated hypertrophy focus)' },
  { id: '6_days', label: '6 Days / Week', sub: 'Push / Pull / Legs x 2 (High-frequency elite athlete routine)' },
];

export const EQUIPMENT_OPTIONS: { id: EquipmentType; label: string; description: string }[] = [
  {
    id: 'gym',
    label: "Tarek's Smart Fitness Gym (Full Armory)",
    description: 'Colossus Power Racks, Vulcan Cable Crossover, Ascent StairMaster, Slat Runners, Leg Press, Calibrated Barbells & Dumbbells.',
  },
  {
    id: 'home',
    label: 'Home Gym Setup',
    description: 'Adjustable Dumbbells, Flat/Incline FID Bench, Pull-Up Bar & Resistance Bands.',
  },
  {
    id: 'calisthenics',
    label: 'Bodyweight & Calisthenics',
    description: 'No heavy weights required. Dips, pull-ups, push-up progressions, core circuits, and bodyweight squats.',
  },
];

export function generateWorkoutPlan(params: {
  athleteName?: string;
  goal: FitnessGoal;
  level: ExperienceLevel;
  frequency: TrainingFrequency;
  equipment: EquipmentType;
  duration?: SessionDuration;
  weightKg?: number;
}): GeneratedWorkoutPlan {
  const name = params.athleteName?.trim() || 'Athlete';
  const weight = params.weightKg || 70;
  const duration = params.duration || '60_min';

  // Calculate nutrition metrics
  let proteinFactor = 1.8;
  let calorieFocus = 'Maintenance or slight 200–300 kcal surplus to fuel progressive overload.';
  if (params.goal === 'hypertrophy') {
    proteinFactor = 2.0;
    calorieFocus = 'Lean Bulk: 300–400 kcal surplus above maintenance with 4–5 evenly spaced protein meals.';
  } else if (params.goal === 'fat_loss') {
    proteinFactor = 2.2;
    calorieFocus = 'Deficit: 400–500 kcal below maintenance. Keep protein high to prevent muscle catabolism.';
  } else if (params.goal === 'strength') {
    proteinFactor = 1.9;
    calorieFocus = 'Performance Fuel: High complex carbohydrates pre-workout to maintain maximal nervous system drive.';
  }

  const dailyProteinGrams = `${Math.round(weight * proteinFactor)}g – ${Math.round(weight * (proteinFactor + 0.3))}g / day`;

  // Coach Tarek's personal wisdom
  let coachTarekAdvice = '';
  if (params.level === 'beginner') {
    coachTarekAdvice =
      '“In my 15 years of training champions in Brahmanbaria, the athletes who succeed never ego-lift. Master the descent (eccentric phase) for 3 solid seconds. Focus on breathing rhythm and leave 2 reps in reserve. I will personally guide you on the floor at Tarek’s Smart Fitness Gym!” — Coach Tarek';
  } else if (params.level === 'intermediate') {
    coachTarekAdvice =
      '“You have your foundation down; now progressive overload is king. Track your weights every single session. If you hit the top rep bracket with clean form, increase weight by 2.5kg the following week. Make sure you utilize the Ascent StairMaster for metabolic conditioning!” — Coach Tarek';
  } else {
    coachTarekAdvice =
      '“At the advanced tier, mechanical tension and mind-muscle contraction dictate hypertrophy. Squeeze the apex of each rep, control the stretch on our Vulcan Cable Crossovers, and keep intra-workout hydration topped with electrolytes. Consistency builds legacies!” — Coach Tarek';
  }

  // Build the day-by-day split based on frequency and goal
  const schedule = buildSplitSchedule(params.goal, params.level, params.frequency, params.equipment);

  const goalTitles: Record<FitnessGoal, string> = {
    hypertrophy: 'Hypertrophy & Muscle Sculpting Protocol',
    fat_loss: 'High-Density Fat Shred & StairMaster Conditioning',
    strength: 'Maximal Power & Powerlifting Force Protocol',
    athletic: 'Functional Athletic Agility & Conditioning',
    beginner: 'Fundamental Strength & Biomechanics Foundation',
  };

  const freqTitles: Record<TrainingFrequency, string> = {
    '3_days': '3-Day Full Body & Core Split',
    '4_days': '4-Day Upper / Lower Hypertrophy Split',
    '5_days': '5-Day PPL + Upper/Lower Elite Split',
    '6_days': '6-Day Push / Pull / Legs High-Volume Periodization',
  };

  return {
    id: `TSF-PLAN-${Math.floor(100000 + Math.random() * 900000)}`,
    athleteName: name,
    goal: params.goal,
    goalTitle: goalTitles[params.goal],
    level: params.level,
    frequency: params.frequency,
    frequencyTitle: freqTitles[params.frequency],
    equipment: params.equipment,
    duration,
    createdAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    coachTarekAdvice,
    nutritionGuidelines: {
      dailyProteinGrams,
      calorieFocus,
      preWorkoutFuel: 'Oatmeal with banana & 1 scoop whey protein or 3 boiled egg whites 60 mins before session.',
      postWorkoutFuel: 'Fast-digesting whey isolate or grilled chicken breast with white rice & electrolytes.',
      hydrationTarget: '3.5 to 4.5 Liters of water daily (keep a bottle by your power rack).',
    },
    schedule,
  };
}

function buildSplitSchedule(
  goal: FitnessGoal,
  level: ExperienceLevel,
  frequency: TrainingFrequency,
  equipment: EquipmentType
): WorkoutDay[] {
  const isGym = equipment === 'gym';
  const isHome = equipment === 'home';

  // Base rep targets and rest times based on level
  const compoundReps = goal === 'strength' ? '4–6 reps' : level === 'beginner' ? '10–12 reps' : '8–10 reps';
  const isolationReps = goal === 'strength' ? '8–10 reps' : '12–15 reps';
  const setsCount = level === 'advanced' ? 4 : level === 'intermediate' ? 3 : 3;
  const restTime = goal === 'strength' ? 150 : 90;

  if (frequency === '3_days') {
    return [
      {
        dayNumber: 1,
        dayTitle: 'Day 1: Full Body Foundation (Squat & Press Focus)',
        focus: 'Quadriceps, Chest, Upper Back & Core',
        estimatedMinutes: 60,
        warmup: [
          '5 mins on Apex Slat Treadmill (light jog & incline walk)',
          'Leg swings, deep bodyweight squats (20 reps)',
          'Rotator cuff external rotations with light band',
        ],
        exercises: [
          {
            id: 'ex-1-1',
            name: isGym ? 'Barbell Back Squat' : isHome ? 'Dumbbell Goblet Squat' : 'Bodyweight Air Squats (Slow Tempo)',
            targetMuscle: 'Quadriceps, Glutes, Core',
            equipment: isGym ? 'Colossus PR-9000 Power Rack + Calibrated Barbell' : isHome ? 'Heavy Dumbbell' : 'Bodyweight',
            sets: setsCount + 1,
            reps: compoundReps,
            restSeconds: restTime,
            rpe: 'RPE 8',
            coachTip: 'Keep chest upright, brace core like taking a punch, drive through mid-foot.',
          },
          {
            id: 'ex-1-2',
            name: isGym ? 'Barbell Flat Bench Press' : isHome ? 'Dumbbell Flat Bench Press' : 'Decline Deficit Push-Ups',
            targetMuscle: 'Pectoralis Major, Anterior Deltoids, Triceps',
            equipment: isGym ? 'Titan B-800 Bench + Colossus Power Rack' : isHome ? 'Flat Bench + Dumbbells' : 'Floor / Elevated surface',
            sets: setsCount,
            reps: compoundReps,
            restSeconds: restTime,
            rpe: 'RPE 8',
            coachTip: 'Retract scapula, tuck elbows 45 degrees, touch lower sternum softly.',
          },
          {
            id: 'ex-1-3',
            name: isGym ? 'Hydra Lat Pulldown' : isHome ? 'Dumbbell Bent-Over Row' : 'Wide-Grip Pull-Ups',
            targetMuscle: 'Latissimus Dorsi, Biceps, Rhomboids',
            equipment: isGym ? 'Hydra LP-300 Lat Pulldown Tower' : isHome ? 'Dumbbells' : 'Pull-Up Bar',
            sets: setsCount,
            reps: isolationReps,
            restSeconds: 75,
            rpe: 'RPE 8',
            coachTip: 'Pull elbows down toward back pockets; do not swing your torso.',
          },
          {
            id: 'ex-1-4',
            name: isGym ? 'Standing Dumbbell Overhead Press' : 'Dumbbell Shoulder Press',
            targetMuscle: 'Anterior & Lateral Deltoids',
            equipment: isGym ? '5-50lb Urethane Dumbbells' : 'Dumbbells',
            sets: setsCount,
            reps: '10–12 reps',
            restSeconds: 75,
            rpe: 'RPE 7.5',
            coachTip: 'Lock glutes to protect lower spine, press vertically until elbows lock out cleanly.',
          },
          {
            id: 'ex-1-5',
            name: 'Hanging Knee Raises / Captains Chair',
            targetMuscle: 'Rectus Abdominis, Hip Flexors',
            equipment: 'Pull-Up Station / Power Rack',
            sets: 3,
            reps: '15–20 reps',
            restSeconds: 60,
            rpe: 'RPE 8',
            coachTip: 'Curl pelvis up toward ribcage, do not use swinging momentum.',
          },
        ],
        cardioFinisher:
          goal === 'fat_loss'
            ? {
                machine: 'Ascent Pro X1 Stair Climber',
                durationMinutes: 15,
                protocol: 'Level 7 steady climb with 30s speed bursts every 2 minutes.',
              }
            : undefined,
        cooldown: ['Hamstring stretch (60s each leg)', 'Chest doorway stretch', 'Cobra abdominal stretch'],
      },
      {
        dayNumber: 2,
        dayTitle: 'Day 2: Full Body Posterior Chain & Pull Focus',
        focus: 'Hamstrings, Posterior Delts, Lats & Biceps',
        estimatedMinutes: 60,
        warmup: [
          '5 mins on Vortex R-500 Rower (dynamic row warmup)',
          'Cat-cow spine stretches & bird-dogs (15 reps)',
          'Band pull-aparts (25 reps)',
        ],
        exercises: [
          {
            id: 'ex-2-1',
            name: isGym ? 'Romanian Deadlift (RDL)' : isHome ? 'Dumbbell Romanian Deadlift' : 'Single-Leg Bodyweight RDL',
            targetMuscle: 'Hamstrings, Gluteus Maximus, Erector Spinae',
            equipment: isGym ? 'Olympus Barbell + Calibrated Plates' : isHome ? 'Dumbbells' : 'Bodyweight',
            sets: setsCount,
            reps: compoundReps,
            restSeconds: restTime,
            rpe: 'RPE 8',
            coachTip: 'Hinge back at the hips like shutting a car door; feel the deep hamstring stretch.',
          },
          {
            id: 'ex-2-2',
            name: isGym ? 'Incline Dumbbell Chest Press' : isHome ? 'Incline Dumbbell Press' : 'Incline Push-Ups',
            targetMuscle: 'Clavicular Upper Chest, Triceps',
            equipment: isGym ? 'Titan B-800 FID Bench (30° angle) + Dumbbells' : 'Adjustable Bench',
            sets: setsCount,
            reps: compoundReps,
            restSeconds: 90,
            rpe: 'RPE 8',
            coachTip: 'Set bench to 30 degrees. Avoid over-arching your lower back.',
          },
          {
            id: 'ex-2-3',
            name: isGym ? 'Seated Cable Row' : isHome ? 'Chest-Supported Dumbbell Row' : 'Inverted Barbell Rows',
            targetMuscle: 'Middle Trapezius, Rhomboids, Lats',
            equipment: isGym ? 'Hydra LP-300 Low Row Station' : 'Bench + Dumbbells',
            sets: setsCount,
            reps: isolationReps,
            restSeconds: 75,
            rpe: 'RPE 8',
            coachTip: 'Squeeze shoulder blades together for 1 full second at full contraction.',
          },
          {
            id: 'ex-2-4',
            name: isGym ? 'Standing Barbell Bicep Curls' : 'Dumbbell Supinated Curls',
            targetMuscle: 'Biceps Brachii',
            equipment: isGym ? 'Olympus Barbell / EZ-Curl Bar' : 'Dumbbells',
            sets: 3,
            reps: '10–12 reps',
            restSeconds: 60,
            rpe: 'RPE 8',
            coachTip: 'Keep elbows pinned to your ribs; do not swing your shoulders.',
          },
          {
            id: 'ex-2-5',
            name: isGym ? 'Vulcan Cable Tricep Pushdowns' : 'Overhead Dumbbell Tricep Extension',
            targetMuscle: 'Lateral & Medial Triceps Heads',
            equipment: isGym ? 'Vulcan FT-500 Cable Crossover with Rope' : 'Dumbbell',
            sets: 3,
            reps: '12–15 reps',
            restSeconds: 60,
            rpe: 'RPE 8.5',
            coachTip: 'Spread the rope at bottom lockout to maximize outer horseshoe contraction.',
          },
        ],
        cardioFinisher:
          goal === 'fat_loss'
            ? {
                machine: 'Tempest AB-9 Air Resistance Bike',
                durationMinutes: 12,
                protocol: 'Tabata: 20s all-out sprint, 10s light pedal for 8 rounds, then 4 mins cool-down.',
              }
            : undefined,
        cooldown: ['Lat child pose stretch', 'Pigeon pose glute stretch', 'Forearm extensor stretch'],
      },
      {
        dayNumber: 3,
        dayTitle: 'Day 3: Full Body Legs, Delts & Functional Armor',
        focus: 'Quads, Calves, Lateral Deltoids & Core Stability',
        estimatedMinutes: 60,
        warmup: [
          '5 mins on Apex Treadmill (high incline walking)',
          'Walking lunges & hip openers (15 steps)',
          'Arm circles & shoulder dislocates with light band',
        ],
        exercises: [
          {
            id: 'ex-3-1',
            name: isGym ? 'Linear Bearing Leg Press' : isHome ? 'Dumbbell Bulgarian Split Squats' : 'Bulgarian Split Squats (Bodyweight)',
            targetMuscle: 'Quadriceps, Glutes, Adductors',
            equipment: isGym ? 'Juggernaut LP-700 Leg Press' : 'Dumbbells + Chair/Bench',
            sets: setsCount,
            reps: isolationReps,
            restSeconds: 90,
            rpe: 'RPE 8.5',
            coachTip: 'Position feet shoulder-width mid-sled. Do not lock knees out at top.',
          },
          {
            id: 'ex-3-2',
            name: isGym ? 'Vulcan Cable Lateral Raises' : 'Dumbbell Side Lateral Raises',
            targetMuscle: 'Lateral Deltoids (Shoulder Width)',
            equipment: isGym ? 'Vulcan FT-500 Cable Crossover' : 'Dumbbells',
            sets: 4,
            reps: '12–15 reps',
            restSeconds: 60,
            rpe: 'RPE 8.5',
            coachTip: 'Lead with your elbows, slight forward torso lean, hold peak for half a second.',
          },
          {
            id: 'ex-3-3',
            name: isGym ? 'Standing Barbell Calf Raises' : 'Single-Leg Dumbbell Calf Raises',
            targetMuscle: 'Gastrocnemius, Soleus',
            equipment: isGym ? 'Colossus Power Rack + Calibrated Barbell' : 'Step ledge + Dumbbell',
            sets: 4,
            reps: '15–20 reps',
            restSeconds: 45,
            rpe: 'RPE 9',
            coachTip: 'Full stretch at bottom, explosive drive onto balls of feet, hold 2s at top.',
          },
          {
            id: 'ex-3-4',
            name: isGym ? 'Vulcan Dual Cable Chest Flyes' : 'Flat Dumbbell Chest Flyes',
            targetMuscle: 'Sternal Pectorals, Inner Chest',
            equipment: isGym ? 'Vulcan FT-500 Cable Crossover' : 'Flat Bench + Dumbbells',
            sets: 3,
            reps: '12–15 reps',
            restSeconds: 60,
            rpe: 'RPE 8',
            coachTip: 'Maintain a slight bend in your elbows; imagine hugging a giant redwood tree.',
          },
          {
            id: 'ex-3-5',
            name: 'Plank with Shoulder Taps / Core Rollout',
            targetMuscle: 'Transverse Abdominis, Obliques',
            equipment: 'Mat / Floor',
            sets: 3,
            reps: '45–60 sec hold',
            restSeconds: 45,
            rpe: 'RPE 8',
            coachTip: 'Keep hips dead level with no twisting or hip sagging.',
          },
        ],
        cardioFinisher: {
          machine: 'Ascent Pro X1 Stair Climber',
          durationMinutes: 12,
          protocol: 'Steady cadence at 60 steps/minute. Burns 150+ calories and tones glutes.',
        },
        cooldown: ['Quad stretch standing', 'Calf wall stretch', 'Seated forward fold'],
      },
    ];
  }

  // 4-day Upper / Lower Power & Hypertrophy Split
  if (frequency === '4_days') {
    return [
      {
        dayNumber: 1,
        dayTitle: 'Day 1: Upper Body Power (Chest, Back & Shoulders)',
        focus: 'Horizontal Push & Pull Strength',
        estimatedMinutes: 65,
        warmup: [
          '5 mins on Apex Treadmill',
          'Band pull-aparts & rotator cuff circles (20 reps)',
          'Push-ups (15 reps warmup)',
        ],
        exercises: [
          {
            id: 'ex-41-1',
            name: isGym ? 'Barbell Bench Press (Heavy)' : 'Heavy Dumbbell Bench Press',
            targetMuscle: 'Chest, Front Delts, Triceps',
            equipment: isGym ? 'Colossus Power Rack + Titan Bench' : 'FID Bench + Dumbbells',
            sets: 4,
            reps: compoundReps,
            restSeconds: restTime,
            rpe: 'RPE 8.5',
            coachTip: 'Drive feet into the floor; use full body leg-drive to stabilize the press.',
          },
          {
            id: 'ex-41-2',
            name: isGym ? 'Bent-Over Barbell Row' : 'Single-Arm Dumbbell Row',
            targetMuscle: 'Lats, Rhomboids, Rear Delts',
            equipment: isGym ? 'Olympus Barbell + Calibrated Plates' : 'Dumbbells',
            sets: 4,
            reps: compoundReps,
            restSeconds: 90,
            rpe: 'RPE 8',
            coachTip: 'Maintain a 45-degree hip hinge. Pull bar straight into your belly button.',
          },
          {
            id: 'ex-41-3',
            name: isGym ? 'Standing Overhead Military Press' : 'Dumbbell Shoulder Press',
            targetMuscle: 'Deltoids, Upper Chest, Core',
            equipment: isGym ? 'Colossus Power Rack + Barbell' : 'Dumbbells',
            sets: 3,
            reps: '8–10 reps',
            restSeconds: 90,
            rpe: 'RPE 8',
            coachTip: 'Move head back slightly as bar passes nose, then push head forward at lockout.',
          },
          {
            id: 'ex-41-4',
            name: isGym ? 'Hydra Lat Pulldown (Neutral Grip)' : 'Dumbbell Pullover',
            targetMuscle: 'Latissimus Dorsi',
            equipment: isGym ? 'Hydra LP-300 Machine' : 'Flat Bench + Dumbbell',
            sets: 3,
            reps: isolationReps,
            restSeconds: 75,
            rpe: 'RPE 8',
            coachTip: 'Slow 3-second negative eccentric stretch on every single rep.',
          },
          {
            id: 'ex-41-5',
            name: isGym ? 'Incline Dumbbell Bicep Curls' : 'Dumbbell Hammer Curls',
            targetMuscle: 'Biceps Brachii Long Head, Brachialis',
            equipment: 'Titan B-800 Bench at 45° + Dumbbells',
            sets: 3,
            reps: '10–12 reps',
            restSeconds: 60,
            rpe: 'RPE 8',
            coachTip: 'Let arms hang fully behind torso for a maximal long-head bicep stretch.',
          },
        ],
        cardioFinisher:
          goal === 'fat_loss'
            ? {
                machine: 'Ascent Pro X1 Stair Climber',
                durationMinutes: 15,
                protocol: 'StairMaster steady climb at Level 6–8.',
              }
            : undefined,
        cooldown: ['Chest doorway stretch', 'Overhead tricep stretch', 'Child pose lat stretch'],
      },
      {
        dayNumber: 2,
        dayTitle: 'Day 2: Lower Body Power (Squat & Posterior Chain)',
        focus: 'Quadriceps, Hamstrings & Glutes',
        estimatedMinutes: 65,
        warmup: [
          '5 mins on Tempest Fan Bike (light cycling)',
          'Deep bodyweight squats (20 reps)',
          'Glute bridges & hip openers',
        ],
        exercises: [
          {
            id: 'ex-42-1',
            name: isGym ? 'Barbell Back Squat' : 'Dumbbell Goblet Squat',
            targetMuscle: 'Quads, Glutes, Core',
            equipment: isGym ? 'Colossus PR-9000 Power Rack' : 'Dumbbell',
            sets: 4,
            reps: compoundReps,
            restSeconds: restTime,
            rpe: 'RPE 8.5',
            coachTip: 'Hit parallel depth or just below. Control the descent with absolute authority.',
          },
          {
            id: 'ex-42-2',
            name: isGym ? 'Barbell Romanian Deadlift' : 'Dumbbell RDL',
            targetMuscle: 'Hamstrings, Gluteus Maximus',
            equipment: isGym ? 'Olympus Barbell + Calibrated Plates' : 'Dumbbells',
            sets: 3,
            reps: '8–10 reps',
            restSeconds: 90,
            rpe: 'RPE 8',
            coachTip: 'Keep bar skimming down your shins; do not let lower back round.',
          },
          {
            id: 'ex-42-3',
            name: isGym ? 'Linear Leg Press' : 'Dumbbell Walking Lunges',
            targetMuscle: 'Quadriceps, Glutes',
            equipment: isGym ? 'Juggernaut LP-700 Leg Press' : 'Dumbbells',
            sets: 3,
            reps: '10–12 reps',
            restSeconds: 90,
            rpe: 'RPE 8.5',
            coachTip: 'Deep knee bend without lifting lower back off seat pad.',
          },
          {
            id: 'ex-42-4',
            name: 'Standing Calf Raises',
            targetMuscle: 'Calves (Gastrocnemius)',
            equipment: isGym ? 'Colossus Power Rack + Barbell' : 'Step Ledge + Dumbbell',
            sets: 4,
            reps: '15–20 reps',
            restSeconds: 45,
            rpe: 'RPE 9',
            coachTip: 'Hold the top peak contraction for a strict 2-second count.',
          },
          {
            id: 'ex-42-5',
            name: 'Hanging Leg Raises / Lying Leg Lifts',
            targetMuscle: 'Lower Rectus Abdominis',
            equipment: 'Pull-up Bar or Mat',
            sets: 3,
            reps: '15 reps',
            restSeconds: 60,
            rpe: 'RPE 8',
            coachTip: 'Do not swing. Pull your knees up using lower abs only.',
          },
        ],
        cooldown: ['Couch stretch for hip flexors', 'Hamstring stretch', 'Foam roll glutes & quads'],
      },
      {
        dayNumber: 3,
        dayTitle: 'Day 3: Upper Body Hypertrophy (Chest, Lats & Arms)',
        focus: 'Incline Angles, Cable Contraction & Arms',
        estimatedMinutes: 65,
        warmup: [
          '5 mins on Vortex Rowing Ergometer',
          'Band dislocates & face-pulls (20 reps)',
        ],
        exercises: [
          {
            id: 'ex-43-1',
            name: isGym ? 'Incline Dumbbell Press' : 'Incline Dumbbell Press',
            targetMuscle: 'Upper Pectorals (Clavicular Head)',
            equipment: isGym ? 'Titan B-800 Bench + 5-50lb Dumbbells' : 'FID Bench + Dumbbells',
            sets: 4,
            reps: '8–10 reps',
            restSeconds: 90,
            rpe: 'RPE 8',
            coachTip: 'Pause for 1 second at the bottom stretch before pressing up.',
          },
          {
            id: 'ex-43-2',
            name: isGym ? 'Seated Cable Row (Wide Grip)' : 'Single-Arm Dumbbell Row',
            targetMuscle: 'Upper Back, Rhomboids, Lats',
            equipment: isGym ? 'Hydra LP-300 Low Row Station' : 'Bench + Dumbbell',
            sets: 4,
            reps: '10–12 reps',
            restSeconds: 75,
            rpe: 'RPE 8',
            coachTip: 'Initiate the movement by retracting your scapula, then drive elbows back.',
          },
          {
            id: 'ex-43-3',
            name: isGym ? 'Vulcan Cable Crossover High-to-Low Flyes' : 'Flat Dumbbell Flyes',
            targetMuscle: 'Lower & Inner Chest',
            equipment: isGym ? 'Vulcan FT-500 Cable Crossover' : 'Flat Bench + Dumbbells',
            sets: 3,
            reps: '12–15 reps',
            restSeconds: 60,
            rpe: 'RPE 8.5',
            coachTip: 'Cross wrists slightly at the bottom peak for an intense inner chest contraction.',
          },
          {
            id: 'ex-43-4',
            name: isGym ? 'Vulcan Cable Lateral Raises' : 'Dumbbell Lateral Raises',
            targetMuscle: 'Side Deltoid (Boulder Shoulders)',
            equipment: isGym ? 'Vulcan FT-500 Cable Machine' : 'Dumbbells',
            sets: 4,
            reps: '12–15 reps',
            restSeconds: 45,
            rpe: 'RPE 9',
            coachTip: 'Maintain continuous cable tension; never let weights touch the stack between reps.',
          },
          {
            id: 'ex-43-5',
            name: isGym ? 'EZ-Bar Skull Crushers + Bicep 21s' : 'Dumbbell Overhead Tricep + Hammer Curls',
            targetMuscle: 'Triceps & Biceps Superset',
            equipment: isGym ? 'Titan Bench + Barbell / Dumbbells' : 'Dumbbells',
            sets: 3,
            reps: '10–12 reps each',
            restSeconds: 60,
            rpe: 'RPE 9',
            coachTip: 'Superset: finish skull crushers, immediately pick up dumbbells for curls with no rest.',
          },
        ],
        cardioFinisher: {
          machine: 'Ascent Pro X1 Stair Climber',
          durationMinutes: 12,
          protocol: 'Ascent StairMaster: 2 mins Level 5 warmup, then 8 mins Level 8, 2 mins cooldown.',
        },
        cooldown: ['Chest & bicep wall stretch', 'Overhead shoulder stretch'],
      },
      {
        dayNumber: 4,
        dayTitle: 'Day 4: Lower Body Volume & Core Shred',
        focus: 'Hamstrings, Quads & Abdominal Conditioning',
        estimatedMinutes: 60,
        warmup: [
          '5 mins on Apex Treadmill',
          'Bodyweight lunges (20 steps)',
          'Hip flexor active dynamic stretches',
        ],
        exercises: [
          {
            id: 'ex-44-1',
            name: isGym ? 'Hack Squat / Front Squat' : 'Dumbbell Front Squat',
            targetMuscle: 'Quadriceps (Vastus Medialis / Teardrop)',
            equipment: isGym ? 'Juggernaut LP-700 Hack Squat' : 'Dumbbells',
            sets: 4,
            reps: '10–12 reps',
            restSeconds: 90,
            rpe: 'RPE 8.5',
            coachTip: 'Place feet lower on platform to shift emphasis directly onto quad teardrop.',
          },
          {
            id: 'ex-44-2',
            name: isGym ? 'Lying / Seated Leg Curls' : 'Dumbbell Lying Hamstring Curl',
            targetMuscle: 'Biceps Femoris (Hamstrings)',
            equipment: isGym ? 'Selectorized Leg Curl Machine' : 'Bench + Dumbbell between feet',
            sets: 4,
            reps: '12–15 reps',
            restSeconds: 60,
            rpe: 'RPE 8.5',
            coachTip: 'Do not allow your hips to lift off the bench during the curl.',
          },
          {
            id: 'ex-44-3',
            name: 'Dumbbell Walking Lunges',
            targetMuscle: 'Glutes, Quads & Hamstring Tie-in',
            equipment: '5-50lb Urethane Dumbbells',
            sets: 3,
            reps: '12 steps per leg',
            restSeconds: 75,
            rpe: 'RPE 8.5',
            coachTip: 'Take long strides to target glutes; keep front knee tracking over middle toes.',
          },
          {
            id: 'ex-44-4',
            name: 'Seated Calf Raises',
            targetMuscle: 'Soleus Calf Muscle',
            equipment: isGym ? 'Seated Calf Machine' : 'Bench + Dumbbells on knees',
            sets: 4,
            reps: '15–20 reps',
            restSeconds: 45,
            rpe: 'RPE 9',
            coachTip: 'Bouncing is forbidden. 1s dead-stop stretch at bottom, 2s squeeze at top.',
          },
          {
            id: 'ex-44-5',
            name: 'Cable Woodchoppers / Russian Twists',
            targetMuscle: 'Obliques, Rotational Core',
            equipment: isGym ? 'Vulcan FT-500 Cable Machine' : 'Dumbbell',
            sets: 3,
            reps: '15 per side',
            restSeconds: 45,
            rpe: 'RPE 8',
            coachTip: 'Rotate using your thoracic spine and obliques, not your arms.',
          },
        ],
        cardioFinisher:
          goal === 'fat_loss'
            ? {
                machine: 'Ascent Pro X1 Stair Climber',
                durationMinutes: 15,
                protocol: 'StairMaster Fat Burner: skip a step every other flight to engage glutes.',
              }
            : undefined,
        cooldown: ['Seated figure-4 piriformis stretch', 'Quad stretch', 'Seated forward fold'],
      },
    ];
  }

  // 5-day / 6-day PPL Split (Default fallback to 5 or 6 days)
  const is6Day = frequency === '6_days';
  const days: WorkoutDay[] = [
    {
      dayNumber: 1,
      dayTitle: 'Day 1: Push (Chest, Front Delts & Triceps)',
      focus: 'Heavy Pressing & Pectoral Development',
      estimatedMinutes: 65,
      warmup: ['5 mins Apex Slat Treadmill', 'Band pull-aparts (20 reps)', 'Light dumbbell bench warmup'],
      exercises: [
        {
          id: 'ex-p-1',
          name: isGym ? 'Barbell Bench Press' : 'Dumbbell Bench Press',
          targetMuscle: 'Middle & Lower Chest',
          equipment: isGym ? 'Colossus Power Rack + Titan Bench' : 'FID Bench + Dumbbells',
          sets: 4,
          reps: compoundReps,
          restSeconds: restTime,
          rpe: 'RPE 8.5',
          coachTip: 'Keep wrists stacked directly over elbows. Drive through mid-foot.',
        },
        {
          id: 'ex-p-2',
          name: isGym ? 'Incline Dumbbell Press' : 'Incline Dumbbell Press',
          targetMuscle: 'Upper Chest (Clavicular)',
          equipment: isGym ? 'Titan B-800 Bench at 30°' : 'FID Bench',
          sets: 3,
          reps: '8–10 reps',
          restSeconds: 90,
          rpe: 'RPE 8',
          coachTip: 'Do not bounce dumbbells together at top. Maintain tension continuously.',
        },
        {
          id: 'ex-p-3',
          name: isGym ? 'Vulcan FT-500 Cable Chest Flyes' : 'Flat Dumbbell Flyes',
          targetMuscle: 'Pectoralis Major',
          equipment: isGym ? 'Vulcan Cable Crossover' : 'Dumbbells',
          sets: 3,
          reps: isolationReps,
          restSeconds: 60,
          rpe: 'RPE 8.5',
          coachTip: 'Contract inner chest hard at apex; hold 1s peak squeeze.',
        },
        {
          id: 'ex-p-4',
          name: isGym ? 'Seated Dumbbell Shoulder Press' : 'Dumbbell Overhead Press',
          targetMuscle: 'Anterior & Lateral Deltoids',
          equipment: 'Titan Bench + Dumbbells',
          sets: 3,
          reps: '10–12 reps',
          restSeconds: 75,
          rpe: 'RPE 8',
          coachTip: 'Lower dumbbells until thumbs touch ear-level, then press smoothly up.',
        },
        {
          id: 'ex-p-5',
          name: isGym ? 'Vulcan Cable Tricep Rope Pushdowns' : 'Overhead Tricep Extension',
          targetMuscle: 'Triceps (Lateral Head)',
          equipment: isGym ? 'Vulcan FT-500 Cable' : 'Dumbbell',
          sets: 4,
          reps: '12–15 reps',
          restSeconds: 60,
          rpe: 'RPE 9',
          coachTip: 'Spread rope apart at bottom lockout; do not let elbows drift forward.',
        },
      ],
      cardioFinisher:
        goal === 'fat_loss'
          ? {
              machine: 'Ascent Pro X1 Stair Climber',
              durationMinutes: 15,
              protocol: 'StairMaster steady climb at Level 7.',
            }
          : undefined,
      cooldown: ['Doorway chest stretch', 'Overhead tricep stretch'],
    },
    {
      dayNumber: 2,
      dayTitle: 'Day 2: Pull (Back, Rear Delts & Biceps)',
      focus: 'Vertical & Horizontal Lat Density',
      estimatedMinutes: 65,
      warmup: ['5 mins Vortex R-500 Rower', 'Scapular pull-ups (10 reps)', 'Band face-pulls (20 reps)'],
      exercises: [
        {
          id: 'ex-pull-1',
          name: isGym ? 'Conventional Deadlift / Heavy Barbell Row' : 'Heavy Dumbbell Deadlift',
          targetMuscle: 'Lats, Spinal Erectors, Traps',
          equipment: isGym ? 'Olympus Barbell + Calibrated Plates' : 'Dumbbells',
          sets: 4,
          reps: compoundReps,
          restSeconds: restTime,
          rpe: 'RPE 8.5',
          coachTip: 'Brace core with diaphragmatic breath, keep lats packed down tight.',
        },
        {
          id: 'ex-pull-2',
          name: isGym ? 'Hydra Lat Pulldown' : 'Pull-Ups / Dumbbell Row',
          targetMuscle: 'Latissimus Dorsi (V-Taper)',
          equipment: isGym ? 'Hydra LP-300 Tower' : 'Pull-Up Bar',
          sets: 4,
          reps: '8–10 reps',
          restSeconds: 75,
          rpe: 'RPE 8',
          coachTip: 'Drive elbows down into your ribs. Do not hyperextend your lumbar spine.',
        },
        {
          id: 'ex-pull-3',
          name: isGym ? 'Hydra Seated Cable Row' : 'Single-Arm Dumbbell Row',
          targetMuscle: 'Rhomboids & Mid Traps',
          equipment: isGym ? 'Hydra LP-300 Low Row' : 'Bench + Dumbbell',
          sets: 3,
          reps: '10–12 reps',
          restSeconds: 75,
          rpe: 'RPE 8',
          coachTip: 'Full stretch forward at start, explode back and hold 1s squeeze.',
        },
        {
          id: 'ex-pull-4',
          name: isGym ? 'Vulcan Cable Face-Pulls' : 'Dumbbell Rear Delt Flyes',
          targetMuscle: 'Rear Deltoids & Infraspinatus',
          equipment: isGym ? 'Vulcan Cable with Rope' : 'Dumbbells',
          sets: 4,
          reps: '15 reps',
          restSeconds: 60,
          rpe: 'RPE 8.5',
          coachTip: 'Pull rope toward forehead while rotating hands back like a double-bicep pose.',
        },
        {
          id: 'ex-pull-5',
          name: isGym ? 'Standing Barbell Bicep Curls' : 'Dumbbell Alternating Curls',
          targetMuscle: 'Biceps Brachii',
          equipment: isGym ? 'Olympus Barbell' : 'Dumbbells',
          sets: 3,
          reps: '10–12 reps',
          restSeconds: 60,
          rpe: 'RPE 8.5',
          coachTip: 'Squeeze biceps with maximum voluntary contraction at top.',
        },
      ],
      cooldown: ['Lat child pose stretch', 'Forearm bicep stretch'],
    },
    {
      dayNumber: 3,
      dayTitle: 'Day 3: Legs (Quads, Hamstrings & Calves)',
      focus: 'Lower Body Strength & Hypertrophy',
      estimatedMinutes: 65,
      warmup: ['5 mins Tempest Fan Bike', 'Deep bodyweight squats (20 reps)', 'Leg swings & hip circles'],
      exercises: [
        {
          id: 'ex-l-1',
          name: isGym ? 'Barbell Back Squat' : 'Dumbbell Goblet Squat',
          targetMuscle: 'Quadriceps & Glutes',
          equipment: isGym ? 'Colossus PR-9000 Power Rack' : 'Heavy Dumbbell',
          sets: 4,
          reps: compoundReps,
          restSeconds: restTime,
          rpe: 'RPE 8.5',
          coachTip: 'Keep knees tracking over second toes, drive upward through heels.',
        },
        {
          id: 'ex-l-2',
          name: isGym ? 'Juggernaut Linear Leg Press' : 'Dumbbell Bulgarian Split Squat',
          targetMuscle: 'Quads & Glutes',
          equipment: isGym ? 'Juggernaut LP-700 Leg Press' : 'Bench + Dumbbells',
          sets: 3,
          reps: '10–12 reps',
          restSeconds: 90,
          rpe: 'RPE 8.5',
          coachTip: 'Smooth cadence; 3 seconds down, 1 second explosive drive.',
        },
        {
          id: 'ex-l-3',
          name: isGym ? 'Barbell Romanian Deadlift' : 'Dumbbell RDL',
          targetMuscle: 'Hamstrings & Gluteus Maximus',
          equipment: isGym ? 'Olympus Barbell' : 'Dumbbells',
          sets: 4,
          reps: '8–10 reps',
          restSeconds: 90,
          rpe: 'RPE 8',
          coachTip: 'Stop descent when hips stop moving backward; do not bend at spine.',
        },
        {
          id: 'ex-l-4',
          name: 'Standing Calf Raises',
          targetMuscle: 'Calves',
          equipment: isGym ? 'Colossus Power Rack' : 'Step Ledge + Dumbbell',
          sets: 4,
          reps: '15–20 reps',
          restSeconds: 45,
          rpe: 'RPE 9',
          coachTip: 'Slow pause at deepest stretch to eliminate Achilles tendon reflex.',
        },
        {
          id: 'ex-l-5',
          name: 'Hanging Leg Raises / Abdominal Crunch',
          targetMuscle: 'Core & Abdominals',
          equipment: 'Pull-Up Bar / Floor',
          sets: 3,
          reps: '15–20 reps',
          restSeconds: 45,
          rpe: 'RPE 8',
          coachTip: 'Exhale all air at peak abdominal contraction.',
        },
      ],
      cardioFinisher: {
        machine: 'Ascent Pro X1 Stair Climber',
        durationMinutes: 12,
        protocol: 'Ascent StairMaster: Level 6 fat incinerator.',
      },
      cooldown: ['Quad standing stretch', 'Pigeon pose glute stretch'],
    },
    {
      dayNumber: 4,
      dayTitle: 'Day 4: Upper Body Pump & Weak Point Overload',
      focus: 'Shoulders, Upper Chest & Arms Hypertrophy',
      estimatedMinutes: 60,
      warmup: ['5 mins Apex Treadmill', 'Band external rotations', 'Push-ups'],
      exercises: [
        {
          id: 'ex-u2-1',
          name: isGym ? 'Incline Barbell Bench Press' : 'Incline Dumbbell Press',
          targetMuscle: 'Clavicular Head (Upper Chest)',
          equipment: isGym ? 'Colossus Power Rack + Titan Bench' : 'FID Bench + Dumbbells',
          sets: 4,
          reps: '8–10 reps',
          restSeconds: 90,
          rpe: 'RPE 8',
          coachTip: 'Lower bar to just under collarbones; flare lats to establish solid shelf.',
        },
        {
          id: 'ex-u2-2',
          name: isGym ? 'Hydra Neutral-Grip Lat Pulldown' : 'Dumbbell Pullover',
          targetMuscle: 'Lats & Teres Major',
          equipment: isGym ? 'Hydra LP-300 Tower' : 'Bench + Dumbbell',
          sets: 3,
          reps: '10–12 reps',
          restSeconds: 75,
          rpe: 'RPE 8',
          coachTip: 'Hold the stretch at the very top for 1 full second.',
        },
        {
          id: 'ex-u2-3',
          name: isGym ? 'Vulcan Cable Lateral Raises' : 'Dumbbell Lateral Raises',
          targetMuscle: 'Lateral Deltoids',
          equipment: isGym ? 'Vulcan FT-500 Cable' : 'Dumbbells',
          sets: 4,
          reps: '15 reps (Triple Drop Set on final set)',
          restSeconds: 60,
          rpe: 'RPE 9.5',
          coachTip: 'Coach Tarek special: on 4th set, drop weight by 30% twice with no rest!',
        },
        {
          id: 'ex-u2-4',
          name: isGym ? 'Preacher Curls / Incline Dumbbell Curls' : 'Incline Dumbbell Curls',
          targetMuscle: 'Biceps Short & Long Head',
          equipment: 'Titan B-800 Bench + Dumbbells',
          sets: 3,
          reps: '10–12 reps',
          restSeconds: 60,
          rpe: 'RPE 8.5',
          coachTip: 'Keep wrists slightly extended to isolate bicep peak.',
        },
        {
          id: 'ex-u2-5',
          name: isGym ? 'Overhead Cable Rope Extension' : 'Dumbbell Overhead Extension',
          targetMuscle: 'Triceps Long Head',
          equipment: isGym ? 'Vulcan FT-500 Cable' : 'Dumbbell',
          sets: 3,
          reps: '12–15 reps',
          restSeconds: 60,
          rpe: 'RPE 8.5',
          coachTip: 'Feel the stretch along the back of your arms on each eccentric rep.',
        },
      ],
      cooldown: ['Chest wall stretch', 'Shoulder cross-body stretch'],
    },
    {
      dayNumber: 5,
      dayTitle: 'Day 5: Lower Body & High-Intensity Conditioning',
      focus: 'Hamstring Tie-In, Glutes & StairMaster Burn',
      estimatedMinutes: 60,
      warmup: ['5 mins Tempest Fan Bike', 'Walking lunges (20 reps)', 'Glute bridges'],
      exercises: [
        {
          id: 'ex-l2-1',
          name: isGym ? 'Barbell Hip Thrust / Glute Drive' : 'Dumbbell Hip Thrust',
          targetMuscle: 'Gluteus Maximus',
          equipment: isGym ? 'Titan Bench + Olympus Barbell' : 'Bench + Dumbbell',
          sets: 4,
          reps: '10–12 reps',
          restSeconds: 90,
          rpe: 'RPE 8.5',
          coachTip: 'Tuck chin into chest, drive through heels, lock hips out horizontally.',
        },
        {
          id: 'ex-l2-2',
          name: isGym ? 'Linear Leg Press (High & Wide Stance)' : 'Dumbbell Goblet Sumo Squat',
          targetMuscle: 'Glutes, Adductors & Hamstrings',
          equipment: isGym ? 'Juggernaut LP-700 Leg Press' : 'Dumbbells',
          sets: 3,
          reps: '12–15 reps',
          restSeconds: 75,
          rpe: 'RPE 8.5',
          coachTip: 'High foot placement shifts mechanical loading onto posterior chain.',
        },
        {
          id: 'ex-l2-3',
          name: 'Dumbbell Romanian Deadlift (Slow Negative)',
          targetMuscle: 'Hamstrings',
          equipment: '5-50lb Urethane Dumbbells',
          sets: 3,
          reps: '10–12 reps',
          restSeconds: 75,
          rpe: 'RPE 8',
          coachTip: 'Count 4 seconds down on every single repetition.',
        },
        {
          id: 'ex-l2-4',
          name: 'Seated Calf Raises',
          targetMuscle: 'Soleus',
          equipment: isGym ? 'Calf Machine' : 'Dumbbells on knees',
          sets: 4,
          reps: '20 reps',
          restSeconds: 45,
          rpe: 'RPE 9',
          coachTip: 'Hold contraction until deep burn sets in.',
        },
        {
          id: 'ex-l2-5',
          name: 'Hanging Leg Raises with Pelvic Tilt',
          targetMuscle: 'Lower Rectus Abdominis & Serratus',
          equipment: 'Pull-Up Bar',
          sets: 3,
          reps: '15 reps',
          restSeconds: 45,
          rpe: 'RPE 8',
          coachTip: 'Slow controlled lowering to prevent lumbar hyperextension.',
        },
      ],
      cardioFinisher: {
        machine: 'Ascent Pro X1 Stair Climber',
        durationMinutes: 15,
        protocol: 'Ascent StairMaster: 15 mins interval training (alternating 1 min fast, 1 min moderate).',
      },
      cooldown: ['Hamstring stretch', 'Hip flexor stretch', 'Spinal twist'],
    },
  ];

  if (is6Day) {
    days.push({
      dayNumber: 6,
      dayTitle: 'Day 6: Arm Armory & Core Finisher (Super-Pump)',
      focus: 'Biceps, Triceps, Forearms & Abdominal Wall',
      estimatedMinutes: 55,
      warmup: ['5 mins Apex Treadmill', 'Light dumbbell curls & extensions (25 reps)'],
      exercises: [
        {
          id: 'ex-6-1',
          name: isGym ? 'Standing Barbell 21s (Biceps)' : 'Dumbbell 21s',
          targetMuscle: 'Biceps Brachii',
          equipment: isGym ? 'Olympus Barbell' : 'Dumbbells',
          sets: 3,
          reps: '7 bottom + 7 top + 7 full = 21 reps',
          restSeconds: 75,
          rpe: 'RPE 9',
          coachTip: 'Coach Tarek’s legendary arm routine: strict form, zero cheating.',
        },
        {
          id: 'ex-6-2',
          name: isGym ? 'Weighted Dips / Bench Dips' : 'Chair Dips',
          targetMuscle: 'Triceps & Lower Chest',
          equipment: isGym ? 'Colossus Power Rack Dip Attachment' : 'Bench',
          sets: 3,
          reps: '10–12 reps',
          restSeconds: 75,
          rpe: 'RPE 8.5',
          coachTip: 'Keep torso upright to focus pure tension onto the triceps.',
        },
        {
          id: 'ex-6-3',
          name: isGym ? 'Incline Dumbbell Hammer Curls' : 'Dumbbell Hammer Curls',
          targetMuscle: 'Brachialis & Forearm Brachioradialis',
          equipment: 'Titan B-800 Bench + Dumbbells',
          sets: 3,
          reps: '12 reps',
          restSeconds: 60,
          rpe: 'RPE 8.5',
          coachTip: 'Grip dumbbells hard; building thick arms requires forearm strength.',
        },
        {
          id: 'ex-6-4',
          name: isGym ? 'Vulcan Cable Tricep Overhead Extension' : 'Dumbbell Overhead Extension',
          targetMuscle: 'Triceps Long Head',
          equipment: isGym ? 'Vulcan FT-500 Cable' : 'Dumbbell',
          sets: 3,
          reps: '12–15 reps',
          restSeconds: 60,
          rpe: 'RPE 8.5',
          coachTip: 'Deep stretch behind neck, flare elbows slightly inward.',
        },
        {
          id: 'ex-6-5',
          name: 'Hanging Knee Tucks to Obliques',
          targetMuscle: 'Obliques & Lower Abs',
          equipment: 'Pull-up Bar',
          sets: 3,
          reps: '12 per side',
          restSeconds: 45,
          rpe: 'RPE 8',
          coachTip: 'Alternate twisting knees left and right at top.',
        },
      ],
      cardioFinisher: {
        machine: 'Ascent Pro X1 Stair Climber',
        durationMinutes: 10,
        protocol: 'Cooldown flush at Level 5.',
      },
      cooldown: ['Bicep & wrist flexor stretch', 'Tricep overhead stretch'],
    });
  }

  return days;
}
