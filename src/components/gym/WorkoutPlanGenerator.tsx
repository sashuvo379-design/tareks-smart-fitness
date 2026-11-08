'use client';

import React, { useState, useEffect } from 'react';
import {
  generateWorkoutPlan,
  GeneratedWorkoutPlan,
  FitnessGoal,
  ExperienceLevel,
  TrainingFrequency,
  EquipmentType,
  SessionDuration,
  GOAL_OPTIONS,
  FREQUENCY_OPTIONS,
  EQUIPMENT_OPTIONS,
} from '@/lib/workout-generator';
import { BRAND_CONFIG } from '@/lib/brand';
import { useStore } from '@/store/use-store';
import {
  Flame,
  Zap,
  Shield,
  Activity,
  Award,
  Calendar,
  Clock,
  Dumbbell,
  CheckCircle2,
  Circle,
  Printer,
  Copy,
  Share2,
  RefreshCw,
  MessageCircle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Apple,
  Droplets,
  HeartPulse,
} from 'lucide-react';

export default function WorkoutPlanGenerator() {
  const { addToast } = useStore();

  // Generator inputs
  const [athleteName, setAthleteName] = useState('');
  const [weightKg, setWeightKg] = useState<number>(72);
  const [goal, setGoal] = useState<FitnessGoal>('hypertrophy');
  const [level, setLevel] = useState<ExperienceLevel>('intermediate');
  const [frequency, setFrequency] = useState<TrainingFrequency>('4_days');
  const [equipment, setEquipment] = useState<EquipmentType>('gym');
  const [duration, setDuration] = useState<SessionDuration>('60_min');

  // Generated Plan
  const [plan, setPlan] = useState<GeneratedWorkoutPlan | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  // Interactive Rest Timer State
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [timerActive, setTimerActive] = useState(false);
  const [timerInitial, setTimerInitial] = useState(90);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      addToast({
        title: 'Rest Timer Complete!',
        description: 'Time to step up to the power rack for your next set.',
        variant: 'volt',
      });
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerSeconds, addToast]);

  const startRestTimer = (seconds: number) => {
    setTimerInitial(seconds);
    setTimerSeconds(seconds);
    setTimerActive(true);
  };

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newPlan = generateWorkoutPlan({
      athleteName,
      goal,
      level,
      frequency,
      equipment,
      duration,
      weightKg,
    });
    setPlan(newPlan);
    setActiveDayIndex(0);
    setCompletedExercises({});
    addToast({
      title: 'Workout Protocol Generated!',
      description: `Custom ${newPlan.frequencyTitle} ready for execution.`,
      variant: 'volt',
    });
  };

  const toggleExercise = (exId: string) => {
    setCompletedExercises((prev) => {
      const next = { ...prev, [exId]: !prev[exId] };
      return next;
    });
  };

  const currentDay = plan ? plan.schedule[activeDayIndex] : null;

  const currentDayCompletedCount = currentDay
    ? currentDay.exercises.filter((ex) => completedExercises[ex.id]).length
    : 0;
  const currentDayProgressPercent = currentDay
    ? Math.round((currentDayCompletedCount / currentDay.exercises.length) * 100)
    : 0;

  const handleCopyPlan = () => {
    if (!plan) return;
    let text = `=== TAREK'S SMART FITNESS GYM // WORKOUT PROTOCOL ===\n`;
    text += `Athlete: ${plan.athleteName}\n`;
    text += `Goal: ${plan.goalTitle}\n`;
    text += `Frequency: ${plan.frequencyTitle}\n`;
    text += `Coach Tarek Note: ${plan.coachTarekAdvice}\n\n`;
    plan.schedule.forEach((day) => {
      text += `[${day.dayTitle}] - Focus: ${day.focus}\n`;
      day.exercises.forEach((ex, idx) => {
        text += `  ${idx + 1}. ${ex.name} (${ex.sets} sets x ${ex.reps}) | Rest: ${ex.restSeconds}s | ${ex.equipment}\n`;
        text += `     Tip: ${ex.coachTip}\n`;
      });
      if (day.cardioFinisher) {
        text += `  Cardio: ${day.cardioFinisher.machine} (${day.cardioFinisher.durationMinutes}m) - ${day.cardioFinisher.protocol}\n`;
      }
      text += `\n`;
    });
    navigator.clipboard.writeText(text);
    addToast({
      title: 'Workout Plan Copied!',
      description: 'Full workout text copied to your clipboard.',
      variant: 'volt',
    });
  };

  const getWhatsAppShareUrl = () => {
    if (!plan) return '#';
    const message = encodeURIComponent(
      `Assalamu Alaikum Coach Tarek,\n\nI just generated a custom workout protocol on your site:\n\n` +
        `• Athlete: ${plan.athleteName}\n` +
        `• Goal: ${plan.goalTitle}\n` +
        `• Split: ${plan.frequencyTitle} (${plan.level.toUpperCase()})\n` +
        `• Equipment: ${plan.equipment === 'gym' ? "Tarek's Smart Fitness Gym" : plan.equipment}\n\n` +
        `I would love to have you review my routine and ask about personal coaching (৳6,000/mo) and membership at Boarding Field, Brahmanbaria!`
    );
    return `https://wa.me/${BRAND_CONFIG.contact.whatsapp}?text=${message}`;
  };

  const getGoalIcon = (id: FitnessGoal) => {
    switch (id) {
      case 'hypertrophy':
        return <Flame className="w-5 h-5 text-volt" />;
      case 'fat_loss':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'strength':
        return <Shield className="w-5 h-5 text-ember" />;
      case 'athletic':
        return <Activity className="w-5 h-5 text-cyan-400" />;
      case 'beginner':
        return <Award className="w-5 h-5 text-gold" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Interactive Generator Configurator */}
      <div className="p-6 sm:p-10 rounded-3xl bg-graphite border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-volt/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt font-mono text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>ALGORITHMIC COACHING ENGINE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-bone">
              CUSTOM WORKOUT <span className="text-volt">PLAN GENERATOR</span>
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              Curated by <strong>Head Coach Tarek (15 Years Experience)</strong>. Select your target goal, training frequency, and available equipment to generate your complete daily exercise splits, reps, sets, rest timers, and nutrition targets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-obsidian border border-white/10">
              <img
                src="/assets/trainers/tarek.jpg"
                alt="Coach Tarek"
                className="w-12 h-12 rounded-xl object-cover border border-volt/40"
                style={{ objectPosition: '72% 15%' }}
              />
              <div>
                <p className="text-xs font-mono text-volt font-bold">COACH TAREK</p>
                <p className="text-[11px] text-muted">15 Years Master Coach</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-8">
          {/* Athlete Profile row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-mono text-muted uppercase tracking-wider mb-2">
                Athlete Name
              </label>
              <input
                type="text"
                placeholder="e.g. Tanvir, Sarah, Rafiq"
                value={athleteName}
                onChange={(e) => setAthleteName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone focus:outline-none focus:border-volt transition"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-muted uppercase tracking-wider mb-2">
                Bodyweight (kg) — For Nutrition Targets
              </label>
              <input
                type="number"
                min="40"
                max="180"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone focus:outline-none focus:border-volt transition"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-muted uppercase tracking-wider mb-2">
                Session Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as SessionDuration)}
                className="w-full px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone focus:outline-none focus:border-volt transition"
              >
                <option value="45_min">45 Minutes (High Density Express)</option>
                <option value="60_min">60 Minutes (Standard Optimal)</option>
                <option value="75_min">75 Minutes (Complete with StairMaster Finisher)</option>
              </select>
            </div>
          </div>

          {/* Step 1: Goal Selection */}
          <div>
            <label className="block text-xs font-mono text-volt uppercase tracking-widest mb-3">
              STEP 01 // SELECT PRIMARY FITNESS GOAL
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {GOAL_OPTIONS.map((opt) => {
                const isSelected = goal === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setGoal(opt.id)}
                    className={`p-4 rounded-2xl text-left border transition flex flex-col justify-between ${
                      isSelected
                        ? 'bg-obsidian border-volt shadow-volt ring-1 ring-volt'
                        : 'bg-obsidian/60 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-lg bg-graphite">{getGoalIcon(opt.id)}</div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-volt shadow-glow" />
                        )}
                      </div>
                      <h4 className="font-display text-lg text-bone">{opt.label}</h4>
                      <p className="text-xs text-muted mt-1 leading-relaxed">{opt.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Experience Level */}
          <div>
            <label className="block text-xs font-mono text-volt uppercase tracking-widest mb-3">
              STEP 02 // EXPERIENCE LEVEL
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {[
                {
                  id: 'beginner' as ExperienceLevel,
                  label: 'Beginner (0–6 Months)',
                  sub: 'Focus on biomechanics, joint stabilization & tempo control',
                },
                {
                  id: 'intermediate' as ExperienceLevel,
                  label: 'Intermediate (6–24 Months)',
                  sub: 'Progressive overload, high volume & hypertrophy density',
                },
                {
                  id: 'advanced' as ExperienceLevel,
                  label: 'Advanced (2+ Years)',
                  sub: 'Periodization, intensity techniques, RPE 9+ & drop-sets',
                },
              ].map((lvl) => {
                const isSelected = level === lvl.id;
                return (
                  <button
                    type="button"
                    key={lvl.id}
                    onClick={() => setLevel(lvl.id)}
                    className={`p-4 rounded-2xl text-left border transition ${
                      isSelected
                        ? 'bg-obsidian border-volt shadow-volt ring-1 ring-volt'
                        : 'bg-obsidian/60 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-base text-bone">{lvl.label}</h4>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-volt" />}
                    </div>
                    <p className="text-xs text-muted mt-1">{lvl.sub}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Frequency & Split */}
          <div>
            <label className="block text-xs font-mono text-volt uppercase tracking-widest mb-3">
              STEP 03 // WEEKLY FREQUENCY & SPLIT
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {FREQUENCY_OPTIONS.map((f) => {
                const isSelected = frequency === f.id;
                return (
                  <button
                    type="button"
                    key={f.id}
                    onClick={() => setFrequency(f.id)}
                    className={`p-4 rounded-2xl text-left border transition ${
                      isSelected
                        ? 'bg-obsidian border-volt shadow-volt ring-1 ring-volt'
                        : 'bg-obsidian/60 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-lg text-bone">{f.label}</h4>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-volt" />}
                    </div>
                    <p className="text-xs text-muted mt-1 leading-snug">{f.sub}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Equipment Environment */}
          <div>
            <label className="block text-xs font-mono text-volt uppercase tracking-widest mb-3">
              STEP 04 // TRAINING ENVIRONMENT & EQUIPMENT
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {EQUIPMENT_OPTIONS.map((eq) => {
                const isSelected = equipment === eq.id;
                return (
                  <button
                    type="button"
                    key={eq.id}
                    onClick={() => setEquipment(eq.id)}
                    className={`p-4 rounded-2xl text-left border transition ${
                      isSelected
                        ? 'bg-obsidian border-volt shadow-volt ring-1 ring-volt'
                        : 'bg-obsidian/60 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-base text-bone">{eq.label}</h4>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-volt" />}
                    </div>
                    <p className="text-xs text-muted mt-1 leading-snug">{eq.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-volt text-obsidian font-mono font-bold text-sm shadow-volt hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              GENERATE CUSTOM WORKOUT PROTOCOL
            </button>
            <p className="text-xs font-mono text-muted">
              Instant generation • 100% Free • Certified by Coach Tarek
            </p>
          </div>
        </form>
      </div>

      {/* Generated Plan Display */}
      {plan && (
        <div id="generated-plan" className="space-y-8 animate-fadeIn">
          {/* Header Action Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-graphite to-obsidian border border-volt/40 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-6">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="px-3 py-1 rounded-full bg-volt/15 border border-volt/30 text-volt font-mono text-xs font-bold uppercase">
                    PROTOCOL ID: {plan.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-obsidian border border-white/10 text-muted font-mono text-xs">
                    CREATED: {plan.createdAt}
                  </span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-bone">
                  {plan.athleteName.toUpperCase()}&apos;S {plan.goalTitle.toUpperCase()}
                </h3>
                <p className="text-sm font-mono text-gold mt-1">
                  {plan.frequencyTitle} • Level: {plan.level.toUpperCase()} • Duration: {plan.duration.replace('_', ' ')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={getWhatsAppShareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian font-mono text-xs font-bold flex items-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  ASK COACH TAREK ON WHATSAPP
                </a>
                <button
                  onClick={handleCopyPlan}
                  className="px-4 py-2.5 rounded-xl bg-obsidian border border-white/15 text-bone font-mono text-xs flex items-center gap-2 hover:border-volt transition"
                >
                  <Copy className="w-4 h-4" />
                  COPY TEXT
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-obsidian border border-white/15 text-bone font-mono text-xs flex items-center gap-2 hover:border-volt transition"
                >
                  <Printer className="w-4 h-4" />
                  PRINT / PDF
                </button>
              </div>
            </div>

            {/* Coach Tarek Quote Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-obsidian border border-volt/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src="/assets/trainers/tarek.jpg"
                alt="Coach Tarek"
                className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-volt/40"
                style={{ objectPosition: '72% 15%' }}
              />
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-bone italic leading-relaxed">
                  {plan.coachTarekAdvice}
                </p>
                <p className="text-[11px] font-mono text-volt mt-1.5 font-bold">
                  — TAREK, FOUNDER &amp; HEAD COACH (15 YEARS EXPERIENCE)
                </p>
              </div>
            </div>

            {/* Nutrition & Recovery Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-obsidian/70 border border-white/5">
                <div className="flex items-center gap-2 text-xs font-mono text-volt mb-1">
                  <Apple className="w-4 h-4" /> DAILY PROTEIN
                </div>
                <p className="font-display text-2xl text-bone">
                  {plan.nutritionGuidelines.dailyProteinGrams}
                </p>
                <p className="text-[11px] text-muted mt-1 leading-snug">
                  Aim for 4–5 protein feedings of 30–40g each.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian/70 border border-white/5">
                <div className="flex items-center gap-2 text-xs font-mono text-gold mb-1">
                  <TrendingUp className="w-4 h-4" /> CALORIC STRATEGY
                </div>
                <p className="text-xs text-bone leading-snug font-medium">
                  {plan.nutritionGuidelines.calorieFocus}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian/70 border border-white/5">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                  <Droplets className="w-4 h-4" /> DAILY HYDRATION
                </div>
                <p className="font-display text-xl text-bone">
                  {plan.nutritionGuidelines.hydrationTarget.split(' ')[0]} Liters
                </p>
                <p className="text-[11px] text-muted mt-1 leading-snug">
                  Electrolytes during heavy power rack sessions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian/70 border border-white/5">
                <div className="flex items-center gap-2 text-xs font-mono text-ember mb-1">
                  <HeartPulse className="w-4 h-4" /> PRE &amp; POST FUEL
                </div>
                <p className="text-[11px] text-bone leading-snug">
                  <strong>Pre:</strong> {plan.nutritionGuidelines.preWorkoutFuel}
                </p>
              </div>
            </div>
          </div>

          {/* Day Selector Tabs & Rest Timer Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Days Tab Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {plan.schedule.map((day, idx) => {
                const isActive = activeDayIndex === idx;
                const completedForDay = day.exercises.filter(
                  (ex) => completedExercises[ex.id]
                ).length;
                const isAllDone = completedForDay === day.exercises.length;

                return (
                  <button
                    key={day.dayNumber}
                    onClick={() => setActiveDayIndex(idx)}
                    className={`px-5 py-3 rounded-2xl font-mono text-xs whitespace-nowrap border transition flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-volt text-obsidian border-volt font-bold shadow-volt'
                        : 'bg-graphite text-bone border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span>Day {day.dayNumber}</span>
                    {isAllDone ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    ) : (
                      <span className="text-[10px] opacity-70">
                        ({completedForDay}/{day.exercises.length})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Rest Timer Widget */}
            <div className="p-3 rounded-2xl bg-graphite border border-white/10 flex items-center gap-3 shrink-0">
              <Clock className="w-4 h-4 text-volt" />
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted">REST TIMER:</span>
                <span className="font-mono text-base font-bold text-bone w-12 text-center">
                  {Math.floor(timerSeconds / 60)}:
                  {String(timerSeconds % 60).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[60, 90, 120].map((s) => (
                  <button
                    key={s}
                    onClick={() => startRestTimer(s)}
                    className={`px-2 py-1 rounded-lg font-mono text-[10px] transition ${
                      timerSeconds === s && timerActive
                        ? 'bg-volt text-obsidian font-bold'
                        : 'bg-obsidian text-muted hover:text-bone'
                    }`}
                  >
                    {s}s
                  </button>
                ))}
                <button
                  onClick={() => setTimerActive(!timerActive)}
                  className="p-1.5 rounded-lg bg-obsidian text-volt hover:bg-volt hover:text-obsidian transition ml-1"
                >
                  {timerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setTimerActive(false);
                    setTimerSeconds(timerInitial);
                  }}
                  className="p-1.5 rounded-lg bg-obsidian text-muted hover:text-bone transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Day Exercises Schedule */}
          {currentDay && (
            <div className="p-6 sm:p-8 rounded-3xl bg-graphite border border-white/10 space-y-6">
              {/* Day Header & Progress Bar */}
              <div className="space-y-4 border-b border-white/10 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs text-volt uppercase tracking-wider">
                      SCHEDULED SESSION // {currentDay.estimatedMinutes} MINUTES
                    </span>
                    <h3 className="font-display text-3xl text-bone mt-1">{currentDay.dayTitle}</h3>
                    <p className="text-xs font-mono text-gold mt-1">Focus: {currentDay.focus}</p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs text-muted block">
                      SESSION COMPLETION: {currentDayProgressPercent}%
                    </span>
                    <span className="font-mono text-sm text-volt font-bold">
                      {currentDayCompletedCount} of {currentDay.exercises.length} Exercises Complete
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-obsidian overflow-hidden">
                  <div
                    className="h-full bg-volt transition-all duration-300"
                    style={{ width: `${currentDayProgressPercent}%` }}
                  />
                </div>

                {/* Warm-up protocol */}
                <div className="p-4 rounded-xl bg-obsidian/60 border border-white/5">
                  <p className="text-xs font-mono text-volt uppercase tracking-wider mb-1 font-bold">
                    PRE-WORKOUT WARMUP PROTOCOL (5–8 MINS):
                  </p>
                  <ul className="text-xs text-muted space-y-1">
                    {currentDay.warmup.map((w, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-volt shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Exercises List */}
              <div className="space-y-4">
                <h4 className="font-mono text-xs text-bone uppercase tracking-widest">
                  MAIN MOVEMENTS &amp; ACCESSORIES
                </h4>

                <div className="space-y-3.5">
                  {currentDay.exercises.map((ex, index) => {
                    const isDone = !!completedExercises[ex.id];
                    return (
                      <div
                        key={ex.id}
                        className={`p-5 rounded-2xl border transition ${
                          isDone
                            ? 'bg-obsidian/40 border-emerald-500/30 opacity-70'
                            : 'bg-obsidian border-white/10 hover:border-volt/40'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <button
                              type="button"
                              onClick={() => toggleExercise(ex.id)}
                              className="mt-1 shrink-0 text-volt hover:scale-110 transition"
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                              ) : (
                                <Circle className="w-6 h-6 text-white/30 hover:text-volt" />
                              )}
                            </button>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-xs text-muted">
                                  #{index + 1}
                                </span>
                                <h5
                                  className={`font-display text-xl sm:text-2xl ${
                                    isDone ? 'line-through text-muted' : 'text-bone'
                                  }`}
                                >
                                  {ex.name}
                                </h5>
                                <span className="px-2 py-0.5 rounded bg-graphite border border-white/10 text-[10px] font-mono text-volt">
                                  {ex.targetMuscle}
                                </span>
                              </div>

                              <p className="text-xs font-mono text-gold mt-1.5">
                                Machine / Gear: {ex.equipment}
                              </p>

                              {/* Coach Tarek's Tip */}
                              <div className="mt-2.5 p-2.5 rounded-xl bg-graphite/70 border border-white/5 text-xs text-bone flex items-start gap-2">
                                <span className="text-volt font-bold shrink-0">COACH TIP:</span>
                                <span>{ex.coachTip}</span>
                              </div>
                            </div>
                          </div>

                          {/* Sets, Reps, RPE & Rest pill */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                            <div className="text-right">
                              <span className="font-mono text-lg font-bold text-bone">
                                {ex.sets} SETS × {ex.reps}
                              </span>
                              <div className="flex items-center gap-2 text-xs font-mono text-muted mt-0.5">
                                <span className="text-ember font-semibold">{ex.rpe}</span>
                                <span>•</span>
                                <span>Rest: {ex.restSeconds}s</span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => startRestTimer(ex.restSeconds)}
                              className="px-3 py-1.5 rounded-lg bg-graphite hover:bg-volt hover:text-obsidian text-volt border border-volt/30 font-mono text-[11px] transition flex items-center gap-1.5"
                            >
                              <Play className="w-3 h-3" />
                              REST {ex.restSeconds}S
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cardio Finisher (StairMaster / HIIT) */}
              {currentDay.cardioFinisher && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-ember/15 via-obsidian to-graphite border border-ember/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-ember uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-ember" />
                      METABOLIC CARDIO FINISHER // {currentDay.cardioFinisher.durationMinutes} MINUTES
                    </span>
                    <span className="font-mono text-[11px] text-muted">
                      Featured in ৳1,200 StairMaster Add-On
                    </span>
                  </div>
                  <h4 className="font-display text-2xl text-bone">
                    {currentDay.cardioFinisher.machine}
                  </h4>
                  <p className="text-xs text-bone leading-relaxed">
                    <strong>Protocol:</strong> {currentDay.cardioFinisher.protocol}
                  </p>
                </div>
              )}

              {/* Cooldown */}
              <div className="p-4 rounded-xl bg-obsidian/40 border border-white/5">
                <span className="font-mono text-[11px] text-muted uppercase tracking-wider block mb-1">
                  POST-WORKOUT DECOMPRESSION &amp; STRETCHING:
                </span>
                <p className="text-xs text-muted">
                  {currentDay.cooldown.join(' • ')}
                </p>
              </div>
            </div>
          )}

          {/* Personal Coaching Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-obsidian border border-volt/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="/assets/trainers/tarek.jpg"
                alt="Trainer Tarek"
                className="w-16 h-16 rounded-2xl object-cover border border-volt/50 shrink-0"
                style={{ objectPosition: '72% 15%' }}
              />
              <div>
                <span className="font-mono text-xs text-volt uppercase tracking-wider">
                  WANT 1-ON-1 SUPERVISION WITH THIS PLAN?
                </span>
                <h4 className="font-display text-2xl text-bone">
                  TRAIN DIRECTLY WITH COACH TAREK (15 YRS EXP)
                </h4>
                <p className="text-xs text-muted mt-1">
                  VIP Personal Coaching package is available at <strong>৳6,000/month</strong> at Boarding Field, Brahmanbaria. Form corrections, weekly body-composition scans &amp; daily nutrition adjustments.
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                "Assalamu Alaikum Coach Tarek, I'd like to sign up for your VIP Personal Coaching (৳6,000/mo) with my new workout routine!"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs whitespace-nowrap shadow-volt hover:brightness-110 transition text-center"
            >
              BOOK VIP COACHING (৳6,000/MO)
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
