'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react'

// Types
type BodyPartRarity = 'common' | 'rare' | 'legendary'
type BodyPartType = 'head' | 'body' | 'arms' | 'legs'

type BodyPart = {
  id: string
  type: BodyPartType
  name: string
  intelligence: number
  strength: number
  agility: number
  energy: number
  rarity: BodyPartRarity
  image: string
}

type AssembledAlien = {
  head?: BodyPart
  body?: BodyPart
  arms?: BodyPart
  legs?: BodyPart
}

type Task = {
  id: string
  name: string
  description: string
  requiredIntelligence: number
  requiredStrength: number
  requiredAgility: number
  requiredEnergy: number
  difficulty: number
}

type GameState = {
  level: number
  score: number
}

type TaskFeedback = {
  totalScore: number
  intelligenceScore: number
  strengthScore: number
  agilityScore: number
  energyScore: number
  message: string
}

// Custom hooks
const useBodyParts = () => {
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([])

  useEffect(() => {
    const parts: BodyPart[] = [
      { id: 'h1', type: 'head', name: 'Brainy Head', intelligence: 8, strength: 1, agility: 2, energy: 3, rarity: 'common', image: '/placeholder.svg?height=50&width=50' },
      { id: 'h2', type: 'head', name: 'Strong Head', intelligence: 3, strength: 7, agility: 2, energy: 4, rarity: 'common', image: '/placeholder.svg?height=50&width=50' },
      { id: 'h3', type: 'head', name: 'Psychic Head', intelligence: 12, strength: 1, agility: 1, energy: 6, rarity: 'rare', image: '/placeholder.svg?height=50&width=50' },
      { id: 'h4', type: 'head', name: 'Omniscient Orb', intelligence: 20, strength: 1, agility: 1, energy: 10, rarity: 'legendary', image: '/placeholder.svg?height=50&width=50' },
      { id: 'b1', type: 'body', name: 'Agile Torso', intelligence: 2, strength: 3, agility: 8, energy: 3, rarity: 'common', image: '/placeholder.svg?height=50&width=50' },
      { id: 'b2', type: 'body', name: 'Energy Core', intelligence: 3, strength: 2, agility: 3, energy: 8, rarity: 'common', image: '/placeholder.svg?height=50&width=50' },
      { id: 'b3', type: 'body', name: 'Adaptive Chassis', intelligence: 5, strength: 5, agility: 5, energy: 5, rarity: 'rare', image: '/placeholder.svg?height=50&width=50' },
      { id: 'b4', type: 'body', name: 'Quantum Frame', intelligence: 10, strength: 10, agility: 10, energy: 10, rarity: 'legendary', image: '/placeholder.svg?height=50&width=50' },
      { id: 'a1', type: 'arms', name: 'Multi-Arms', intelligence: 4, strength: 5, agility: 6, energy: 1, rarity: 'common', image: '/placeholder.svg?height=50&width=50' },
      { id: 'a2', type: 'arms', name: 'Power Arms', intelligence: 1, strength: 9, agility: 2, energy: 4, rarity: 'common', image: '/placeholder.svg?height=50&width=50' },
      { id: 'a3', type: 'arms', name: 'Precision Manipulators', intelligence: 7, strength: 3, agility: 8, energy: 2, rarity: 'rare', image: '/placeholder.svg?height=50&width=50' },
      { id: 'a4', type: 'arms', name: 'Cosmic Tentacles', intelligence: 15, strength: 15, agility: 15, energy: 5, rarity: 'legendary', image: '/placeholder.svg?height=50&width=50' },
      { id: 'l1', type: 'legs', name: 'Speed Legs', intelligence: 2, strength: 3, agility: 9, energy: 2, rarity: 'common', image: '/placeholder.svg?height=50&width=50' },
      { id: 'l2', type: 'legs', name: 'Stable Legs', intelligence: 3, strength: 6, agility: 4, energy: 3, rarity: 'common', image: '/placeholder.svg?height=50&width=50' },
      { id: 'l3', type: 'legs', name: 'Hover Pads', intelligence: 5, strength: 2, agility: 10, energy: 5, rarity: 'rare', image: '/placeholder.svg?height=50&width=50' },
      { id: 'l4', type: 'legs', name: 'Quantum Leapers', intelligence: 10, strength: 5, agility: 20, energy: 15, rarity: 'legendary', image: '/placeholder.svg?height=50&width=50' },
    ]
    setBodyParts(parts)
  }, [])

  return bodyParts
}

const useTasks = (level: number) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const baseTasks: Task[] = [
      { id: 't1', name: 'Solve Cosmic Puzzle', description: 'Decipher an ancient alien artifact', requiredIntelligence: 15, requiredStrength: 5, requiredAgility: 8, requiredEnergy: 10, difficulty: 1 },
      { id: 't2', name: 'Defend Space Station', description: 'Protect against an incoming asteroid shower', requiredIntelligence: 8, requiredStrength: 18, requiredAgility: 12, requiredEnergy: 14, difficulty: 1 },
      { id: 't3', name: 'Navigate Quantum Maze', description: 'Find the way through a complex 4D labyrinth', requiredIntelligence: 12, requiredStrength: 6, requiredAgility: 20, requiredEnergy: 10, difficulty: 1 },
      { id: 't4', name: 'Diplomatic Negotiation', description: 'Broker peace between warring alien factions', requiredIntelligence: 25, requiredStrength: 5, requiredAgility: 5, requiredEnergy: 15, difficulty: 2 },
      { id: 't5', name: 'Galactic Sports Tournament', description: 'Compete in the multi-discipline Cosmic Olympics', requiredIntelligence: 10, requiredStrength: 20, requiredAgility: 25, requiredEnergy: 20, difficulty: 2 },
      { id: 't6', name: 'Stellar Engineering', description: 'Stabilize a dying star to save a civilization', requiredIntelligence: 30, requiredStrength: 15, requiredAgility: 10, requiredEnergy: 25, difficulty: 3 },
    ]

    const scaledTasks = baseTasks.map(task => ({
      ...task,
      requiredIntelligence: Math.round(task.requiredIntelligence * (1 + 0.1 * level)),
      requiredStrength: Math.round(task.requiredStrength * (1 + 0.1 * level)),
      requiredAgility: Math.round(task.requiredAgility * (1 + 0.1 * level)),
      requiredEnergy: Math.round(task.requiredEnergy * (1 + 0.1 * level)),
    }))

    setTasks(scaledTasks)
  }, [level])

  return tasks
}

// Components
const BodyPartSelector: React.FC<{ parts: BodyPart[], onSelect: (part: BodyPart) => void }> = ({ parts, onSelect }) => {
  const [selectedType, setSelectedType] = useState<BodyPartType | 'all'>('all')
  const [selectedRarity, setSelectedRarity] = useState<BodyPartRarity | 'all'>('all')

  const filteredParts = parts.filter(part => 
    (selectedType === 'all' || part.type === selectedType) &&
    (selectedRarity === 'all' || part.rarity === selectedRarity)
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Body Parts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Select onValueChange={(value) => setSelectedType(value as BodyPartType | 'all')}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="head">Head</SelectItem>
              <SelectItem value="body">Body</SelectItem>
              <SelectItem value="arms">Arms</SelectItem>
              <SelectItem value="legs">Legs</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedRarity(value as BodyPartRarity | 'all')}>
            <SelectTrigger>
              <SelectValue placeholder="Select rarity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rarities</SelectItem>
              <SelectItem value="common">Common</SelectItem>
              <SelectItem value="rare">Rare</SelectItem>
              <SelectItem value="legendary">Legendary</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="grid grid-cols-2 gap-2">
            {filteredParts.map(part => (
              <TooltipProvider key={part.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      className={`p-2 text-white rounded shadow flex items-center justify-between ${
                        part.rarity === 'legendary' ? 'bg-yellow-600' : part.rarity === 'rare' ? 'bg-purple-600' : 'bg-blue-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSelect(part)}
                    >
                      <span>{part.name}</span>
                      <img src={part.image} alt={part.name} className="w-6 h-6" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Intelligence: {part.intelligence}</p>
                    <p>Strength: {part.strength}</p>
                    <p>Agility: {part.agility}</p>
                    <p>Energy: {part.energy}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

const AlienAssembly: React.FC<{ alien: AssembledAlien, onRemove: (type: keyof AssembledAlien) => void }> = ({ alien, onRemove }) => (
  <Card>
    <CardHeader>
      <CardTitle>Assembled Alien</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center space-y-4">
        {Object.entries(alien).map(([type, part]) => part && (
          <motion.div
            key={type}
            className={`p-2 text-white rounded w-full text-center flex items-center justify-between ${
              part.rarity === 'legendary' ? 'bg-yellow-600' : part.rarity === 'rare' ? 'bg-purple-600' : 'bg-green-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <span>{part.name}</span>
            <div className="flex items-center">
              <img src={part.image} alt={part.name} className="w-6 h-6 mr-2" />
              <Button variant="ghost" size="icon" onClick={() => onRemove(type as keyof AssembledAlien)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const TaskSelector: React.FC<{ tasks: Task[], onSelect: (task: Task) => void, selectedTask?: Task }> = ({ tasks, onSelect, selectedTask }) => (
  <Card>
    <CardHeader>
      <CardTitle>Available Tasks</CardTitle>
    </CardHeader>
    <CardContent>
      <Select onValueChange={(value) => onSelect(tasks.find(task => task.id === value)!)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a task" />
        </SelectTrigger>
        <SelectContent>
          {tasks.map(task => (
            <SelectItem key={task.id} value={task.id}>
              {task.name} (Difficulty: {task.difficulty})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedTask && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{selectedTask.name}</h3>
          <p className="text-sm text-gray-500">{selectedTask.description}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>Intelligence: {selectedTask.requiredIntelligence}</div>
            <div>Strength: {selectedTask.requiredStrength}</div>
            <div>Agility: {selectedTask.requiredAgility}</div>
            <div>Energy: {selectedTask.requiredEnergy}</div>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
)

const AlienStats: React.FC<{ alien: AssembledAlien }> = ({ alien }) => {
  const stats = Object.values(alien).reduce((acc, part) => {
    if (part) {
      acc.intelligence += part.intelligence
      acc.strength += part.strength
      acc.agility += part.agility
      acc.energy += part.energy
    }
    return acc
  }, { intelligence: 0, strength: 0, agility: 0, energy: 0 })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alien Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(stats).map(([stat, value]) => (
            <div key={stat} className="flex items-center">
              <span className="capitalize mr-2">{stat}:</span>
              <Badge variant="secondary">{value}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const AlienVisual: React.FC<{ alien: AssembledAlien }> = ({ alien }) => (
  <Card>
    <CardHeader>
      <CardTitle>Alien Visual</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="relative w-48 h-48 mx-auto">
        {alien.body && <img src={alien.body.image} alt="Body" className="absolute top-1/4 left-1/4 w-1/2 h-1/2" />}
        {alien.head && <img src={alien.head.image} alt="Head" className="absolute top-0 left-1/3 w-1/3 h-1/3" />}
        {alien.arms && <img src={alien.arms.image} alt="Arms" className="absolute top-1/4 left-0 w-1/4 h-1/2" />}
        {alien.arms && <img src={alien.arms.image} alt="Arms" className="absolute top-1/4 right-0 w-1/4 h-1/2 transform scale-x-[-1]" />}
        {alien.legs && <img src={alien.legs.image} alt="Legs" className="absolute bottom-0 left-1/4 w-1/2 h-1/3" />}
      </div>
    </CardContent>
  </Card>
)

const FeedbackModal: React.FC<{ feedback: TaskFeedback | null, onClose: () => void }> = ({ feedback, onClose }) => (
  <Dialog open={!!feedback} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Task Feedback</DialogTitle>
      </DialogHeader>
      {feedback && (
        <div className="space-y-4">
          <p className="text-lg font-semibold">Total Score: {feedback.totalScore}</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <span className="mr-2">Intelligence:</span>
              {feedback.intelligenceScore < 1 ? <AlertCircle className="text-yellow-500" /> : <CheckCircle2 className="text-green-500" />}
            </div>
            <div className="flex items-center">
              <span className="mr-2">Strength:</span>
              {feedback.strengthScore < 1 ? <AlertCircle className="text-yellow-500" /> : <CheckCircle2 className="text-green-500" />}
            </div>
            <div className="flex items-center">
              <span className="mr-2">Agility:</span>
              {feedback.agilityScore < 1 ? <AlertCircle className="text-yellow-500" /> : <CheckCircle2 className="text-green-500" />}
            </div>
            <div className="flex items-center">
              <span className="mr-2">Energy:</span>
              {feedback.energyScore < 1 ? <AlertCircle className="text-yellow-500" /> : <CheckCircle2 className="text-green-500" />}
            </div>
          </div>
          <DialogDescription>{feedback.message}</DialogDescription>
        </div>
      )}
    </DialogContent>
  </Dialog>
)

// Main component
export default function ImprovedAlienAssemblyGame() {
  const [assembledAlien, setAssembledAlien] = useState<AssembledAlien>({})
  const [selectedTask, setSelectedTask] = useState<Task>()
  const [gameState, setGameState] = useState<GameState>({ level: 1, score: 0 })
  const [feedback, setFeedback] = useState<TaskFeedback | null>(null)
  const bodyParts = useBodyParts()
  const tasks = useTasks(gameState.level)

  const handleSelectPart = (part: BodyPart) => {
    setAssembledAlien(prev => ({ ...prev, [part.type]: part }))
  }

  const handleRemovePart = (type: keyof AssembledAlien) => {
    setAssembledAlien(prev => {
      const newAlien = { ...prev }
      delete newAlien[type]
      return newAlien
    })
  }

  const calculateScore = useCallback((alien: AssembledAlien, task: Task) => {
    const alienStats = Object.values(alien).reduce((acc, part) => {
      if (part) {
        acc.intelligence += part.intelligence
        acc.strength += part.strength
        acc.agility += part.agility
        acc.energy += part.energy
      }
      return acc
    }, { intelligence: 0, strength: 0, agility: 0, energy: 0 })

    const intelligenceScore = Math.min(alienStats.intelligence / task.requiredIntelligence, 1)
    const strengthScore = Math.min(alienStats.strength / task.requiredStrength, 1)
    const agilityScore = Math.min(alienStats.agility / task.requiredAgility, 1)
    const energyScore = Math.min(alienStats.energy / task.requiredEnergy, 1)

    return {
      totalScore: Math.round((intelligenceScore + strengthScore + agilityScore + energyScore) * 25 * task.difficulty),
      intelligenceScore,
      strengthScore,
      agilityScore,
      energyScore
    }
  }, [])

  const handleCompleteTask = () => {
    if (selectedTask) {
      const { totalScore, intelligenceScore, strengthScore, agilityScore, energyScore } = calculateScore(assembledAlien, selectedTask)
      setGameState(prev => ({ level: prev.level + 1, score: prev.score + totalScore }))

      let feedbackMessage = `Task completed! You earned ${totalScore} points.\n`
      if (intelligenceScore < 1) feedbackMessage += `Intelligence: -${Math.round((1 - intelligenceScore) * selectedTask.requiredIntelligence)}\n`
      if (strengthScore < 1) feedbackMessage += `Strength: -${Math.round((1 - strengthScore) * selectedTask.requiredStrength)}\n`
      if (agilityScore < 1) feedbackMessage += `Agility: -${Math.round((1 - agilityScore) * selectedTask.requiredAgility)}\n`
      if (energyScore < 1) feedbackMessage += `Energy: -${Math.round((1 - energyScore) * selectedTask.requiredEnergy)}\n`

      setFeedback({
        totalScore,
        intelligenceScore,
        strengthScore,
        agilityScore,
        energyScore,
        message: feedbackMessage
      })
      setSelectedTask(undefined)

      // Random event
      if (Math.random() < 0.2) {
        const eventTypes = ['bonus', 'penalty']
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
        const eventValue = Math.floor(Math.random() * 50) + 1

        if (eventType === 'bonus') {
          setGameState(prev => ({ ...prev, score: prev.score + eventValue }))
          setFeedback(prev => prev ? { ...prev, message: `${prev.message}\nRandom Event: You found ${eventValue} bonus points!` } : null)
        } else {
          setGameState(prev => ({ ...prev, score: Math.max(0, prev.score - eventValue) }))
          setFeedback(prev => prev ? { ...prev, message: `${prev.message}\nRandom Event: You lost ${eventValue} points due to an unexpected challenge!` } : null)
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Improved Alien Assembly Game</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BodyPartSelector parts={bodyParts} onSelect={handleSelectPart} />
        <div className="space-y-8">
          <AlienAssembly alien={assembledAlien} onRemove={handleRemovePart} />
          <AlienStats alien={assembledAlien} />
          <AlienVisual alien={assembledAlien} />
        </div>
        <div className="space-y-8">
          <TaskSelector tasks={tasks} onSelect={setSelectedTask} selectedTask={selectedTask} />
          <Card>
            <CardHeader>
              <CardTitle>Game Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">Level: {gameState.level}</p>
                  <p className="text-lg font-semibold">Score: {gameState.score}</p>
                </div>
                <Button onClick={handleCompleteTask} disabled={!selectedTask}>Complete Task</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FeedbackModal feedback={feedback} onClose={() => setFeedback(null)} />
    </div>
  )
}