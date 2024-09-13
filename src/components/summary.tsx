import {
  CheckCircle2,
  CircleChevronDown,
  CircleEllipsis,
  CircleX,
  Plus,
} from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { getSummary } from '../http/get-summary'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-BR'
import { PendingGoals } from './pending-goals'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { useState } from 'react'

dayjs.locale(ptBr)

export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!data) return null

  const firstDayOfWeek = dayjs().startOf('week').format('DD MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('DD MMM')

  const completedPercentage = Math.round((data?.completed * 100) / data.total)

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data?.completed}</span> de{' '}
            <span className="text-zinc-100">{data?.total}</span> metas nesta
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>
          {Object.entries(data.goalsPerDay).map(([date, goals]) => {
            const [isCollapsed, setIsCollapsed] = useState(false)

            const weekDay = dayjs(date).format('dddd')
            const formatedDate = dayjs(date).format('DD[ de ]MMMM')

            return (
              <Collapsible
                key={date}
                open={isCollapsed}
                onOpenChange={setIsCollapsed}
              >
                <div className="flex flex-col gap-4">
                  <h3 className="font-medium flex items-center justify-between">
                    <div>
                      <span className="capitalize">{weekDay}</span>{' '}
                      <span className="text-zinc-400 text-xs">
                        ({formatedDate})
                      </span>
                    </div>
                    {goals.length === 1 ? (
                      <span className="flex items-center gap-2">
                        <span className="text-zinc-400 text-xs">
                          {goals.length} meta concluída
                        </span>
                      </span>
                    ) : (
                      <CollapsibleTrigger asChild>
                        <span className="flex items-center gap-2 hover:cursor-pointer hover:brightness-75">
                          <span className="text-zinc-400 text-xs">
                            {goals.length} metas concluídas
                          </span>
                          {isCollapsed ? <CircleX /> : <CircleEllipsis />}
                        </span>
                      </CollapsibleTrigger>
                    )}
                  </h3>

                  <ul className="flex flex-col gap-3">
                    <li key={goals[0].id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goals[0].title}</span>"
                        às{' '}
                        <span className="text-zinc-100">
                          {dayjs(goals[0].completedAt).format('HH:mm')}h
                        </span>
                      </span>
                    </li>
                    <CollapsibleContent asChild>
                      <div className="flex flex-col gap-3">
                        {goals.slice(1).map(goal => {
                          const time = dayjs(goal.completedAt).format('HH:mm')
                          return (
                            <li
                              key={goal.id}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle2 className="size-4 text-pink-500" />
                              <span className="text-sm text-zinc-400">
                                Você completou "
                                <span className="text-zinc-100">
                                  {goal.title}
                                </span>
                                " às{' '}
                                <span className="text-zinc-100">{time}h</span>
                              </span>
                            </li>
                          )
                        })}
                      </div>
                    </CollapsibleContent>
                  </ul>
                </div>
              </Collapsible>
            )
          })}
        </div>
      </div>
    </div>
  )
}
